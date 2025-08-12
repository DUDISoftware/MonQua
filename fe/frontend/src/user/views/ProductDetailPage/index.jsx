import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getProductById, getRelatedProducts } from '../../../api/product.api.js';
import { getUserById } from '../../../api/user.api.js';
import { getCategories } from '../../../api/product.category.api.js';

import Banner from './Banner/index.jsx';
import ProductDetailMain from './ProductDetailMain/index.jsx';
import Sidebar from './Sidebar/index.jsx';
import RelatedProducts from './RelatedProducts/index.jsx';
import Pagination from './Pagination/index.jsx';

const ProductDetailPage = () => {
    const { id } = useParams();

    // State management
    const [product, setProduct] = useState(null);
    const [giver, setGiver] = useState(null);
    const [categories, setCategories] = useState([]);
    const [relatedProducts, setRelatedProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch product data
    useEffect(() => {
        const fetchProductData = async () => {
            try {
                setLoading(true);
                setError(null);

                // Fetch product details
                const productResponse = await getProductById(id);
                console.log('Product response:', productResponse);
                console.log('Product response data:', productResponse?.data);
                console.log('Is data array?', Array.isArray(productResponse?.data));

                // Parse product data correctly - API returns array with single object
                let productData = null;
                if (productResponse?.data) {
                    if (Array.isArray(productResponse.data) && productResponse.data.length > 0) {
                        productData = productResponse.data[0];
                    } else if (typeof productResponse.data === 'object' && !Array.isArray(productResponse.data)) {
                        productData = productResponse.data;
                    }
                }
                console.log('Parsed product data:', productData);

                if (productData) {
                    setProduct(productData);
                    console.log('Product data user_id:', productData.user_id);

                    // Check if user_id is already populated (which it should be based on API response)
                    if (productData.user_id && typeof productData.user_id === 'object' && productData.user_id._id) {
                        // User is already populated
                        console.log('User already populated:', productData.user_id);
                        setGiver(productData.user_id);
                    } else if (productData.user_id && typeof productData.user_id === 'string') {
                        // User_id is just an ID string, need to fetch user data
                        console.log('User ID is string, might need to fetch:', productData.user_id);
                        // For now, let's just set a placeholder and see what happens
                        console.warn('User ID is string - API should populate this automatically');
                    } else {
                        console.warn('No user_id found in product data');
                    }

                    // Fetch related products by category
                    const categoryId = productData.category_id?._id || productData.category_id;
                    if (categoryId) {
                        try {
                            const relatedResponse = await getRelatedProducts(id, 6);
                            const relatedData = relatedResponse?.data || [];
                            setRelatedProducts(Array.isArray(relatedData) ? relatedData : []);
                        } catch (relatedError) {
                            console.error('Error fetching related products:', relatedError);
                        }
                    }
                }

                // Fetch categories
                try {
                    const categoriesResponse = await getCategories();
                    console.log('Categories response:', categoriesResponse);
                    const categoriesData = categoriesResponse?.data || categoriesResponse?.categories || categoriesResponse;
                    setCategories(Array.isArray(categoriesData) ? categoriesData : []);
                } catch (categoriesError) {
                    console.error('Error fetching categories:', categoriesError);
                }

            } catch (err) {
                console.error('Error fetching product data:', err);
                setError('Không thể tải thông tin sản phẩm. Vui lòng thử lại sau.');
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchProductData();
        }
    }, [id]);

    // Loading state
    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto mb-4"></div>
                    <p className="text-gray-600">Đang tải thông tin sản phẩm...</p>
                </div>
            </div>
        );
    }

    // Error state
    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="text-red-500 text-xl mb-4">❌</div>
                    <p className="text-red-600 mb-4">{error}</p>
                    <button
                        onClick={() => window.location.reload()}
                        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                    >
                        Thử lại
                    </button>
                </div>
            </div>
        );
    }

    // No product found
    if (!product) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="text-gray-400 text-xl mb-4">📦</div>
                    <p className="text-gray-600">Không tìm thấy sản phẩm</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Banner Section */}
            <Banner product={product} />

            <div className="container mx-auto px-4 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-3">
                        <ProductDetailMain
                            product={product}
                            categories={categories}
                        />
                    </div>

                    {/* Sidebar */}
                    <div className="lg:col-span-1">
                        <Sidebar
                            giver={giver}
                            product={product}
                            categories={categories}
                        />
                    </div>
                </div>

                {/* Related Products */}
                {relatedProducts.length > 0 && (
                    <div className="mt-12">
                        <RelatedProducts products={relatedProducts} />
                    </div>
                )}

                {/* Pagination */}
                <div className="mt-8">
                    <Pagination />
                </div>
            </div>
        </div>
    );
};

export default ProductDetailPage;
