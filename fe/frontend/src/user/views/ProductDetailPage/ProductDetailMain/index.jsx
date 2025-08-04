import React from 'react';
import ProductTitle from './ProductTitle.jsx';
import ProductCarousel from './ProductCarousel.jsx';
import ProductFeatures from './ProductFeatures.jsx';
import ProductDescription from './ProductDescription.jsx';

const ProductDetailMain = ({ product, categories }) => {
    if (!product) return null;

    // Get category name from populated data or categories list
    const categoryName = product.category_id?.category_name ||
        categories.find(cat => cat._id === (product.category_id?._id || product.category_id))?.category_name ||
        'Không có danh mục';

    return (
        <div className="bg-white rounded-lg border border-gray-200 p-6">
            {/* 1. TITLE & BASIC INFO */}
            <div className="mb-6">
                <ProductTitle title={product.title} />

                {/* Quick Info */}
                <div className="flex flex-wrap gap-2 mb-4">
                    <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                        {categoryName}
                    </span>
                    <span className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm">
                        {product.label || 'Mới'}
                    </span>
                    {product.is_heavy && (
                        <span className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm">
                            Hàng nặng
                        </span>
                    )}
                </div>
            </div>

            {/* 2. IMAGES */}
            <ProductCarousel
                image={product.image_url}
                subImages={product.sub_images_urls || []}
            />

            {/* 3. PRODUCT DETAILS */}
            <ProductFeatures
                quality={product.quality}
                location={product.location || product.location_details?.full_address}
                status={product.status}
                deliveryMethod={product.delivery_method}
                viewCount={product.view_count}
            />

            {/* 4. DESCRIPTION */}
            <ProductDescription description={product.description} />

            {/* 5. DETAILED LOCATION - Trust building */}
            {product.location_details && (
                <div className="mb-8">
                    <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                        <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
                        📍 Địa chỉ nhận hàng
                    </h2>
                    <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-xl border border-green-100 shadow-sm">
                        {/* Full Address First - Most Important */}
                        <div className="bg-white/80 backdrop-blur-sm p-4 rounded-lg border border-green-200 mb-4">
                            <p className="text-sm text-gray-600 mb-1">📮 Địa chỉ đầy đủ:</p>
                            <p className="font-semibold text-gray-900 text-lg">{product.location_details.full_address || 'N/A'}</p>
                        </div>

                        {/* Detailed breakdown */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                            <div className="bg-white/60 p-3 rounded-lg text-center">
                                <div className="text-xl mb-1">🏙️</div>
                                <p className="text-xs text-gray-500 uppercase">Tỉnh/TP</p>
                                <p className="font-medium text-sm">{product.location_details.province_name || 'N/A'}</p>
                            </div>

                            <div className="bg-white/60 p-3 rounded-lg text-center">
                                <div className="text-xl mb-1">�️</div>
                                <p className="text-xs text-gray-500 uppercase">Quận/Huyện</p>
                                <p className="font-medium text-sm">{product.location_details.district_name || 'N/A'}</p>
                            </div>

                            <div className="bg-white/60 p-3 rounded-lg text-center">
                                <div className="text-xl mb-1">🏠</div>
                                <p className="text-xs text-gray-500 uppercase">Xã/Phường</p>
                                <p className="font-medium text-sm">{product.location_details.ward_name || 'N/A'}</p>
                            </div>

                            <div className="bg-white/60 p-3 rounded-lg text-center">
                                <div className="text-xl mb-1">📍</div>
                                <p className="text-xs text-gray-500 uppercase">Số nhà</p>
                                <p className="font-medium text-sm">{product.location_details.specific_address || 'N/A'}</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* 6. SOCIAL PROOF - Statistics Last */}
            <div className="mb-8">
                <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                    <span className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></span>
                    📊 Thống kê & độ tin cậy
                </h2>
                <div className="bg-gradient-to-br from-yellow-50 to-orange-50 p-6 rounded-xl border border-yellow-100 shadow-sm">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-white/70 backdrop-blur-sm p-4 rounded-lg text-center hover:scale-105 transition-transform">
                            <div className="text-3xl mb-2">👁️</div>
                            <p className="text-2xl font-bold text-blue-600">{product.view_count || 0}</p>
                            <p className="text-sm text-gray-600">Lượt xem</p>
                            <div className="w-full bg-blue-100 rounded-full h-2 mt-2">
                                <div className="bg-blue-500 h-2 rounded-full" style={{ width: `${Math.min((product.view_count || 0) / 100 * 100, 100)}%` }}></div>
                            </div>
                        </div>

                        <div className="bg-white/70 backdrop-blur-sm p-4 rounded-lg text-center hover:scale-105 transition-transform">
                            <div className="text-3xl mb-2">❤️</div>
                            <p className="text-2xl font-bold text-red-500">{product.interested_count || 0}</p>
                            <p className="text-sm text-gray-600">Lượt quan tâm</p>
                            <div className="w-full bg-red-100 rounded-full h-2 mt-2">
                                <div className="bg-red-500 h-2 rounded-full" style={{ width: `${Math.min((product.interested_count || 0) / 50 * 100, 100)}%` }}></div>
                            </div>
                        </div>

                        <div className="bg-white/70 backdrop-blur-sm p-4 rounded-lg text-center hover:scale-105 transition-transform">
                            <div className="text-3xl mb-2">📅</div>
                            <p className="text-lg font-bold text-green-600">
                                {product.created_at ? new Date(product.created_at).toLocaleDateString('vi-VN') : 'N/A'}
                            </p>
                            <p className="text-sm text-gray-600">Ngày đăng</p>
                            <p className="text-xs text-gray-500 mt-1">
                                {product.created_at ?
                                    `${Math.floor((Date.now() - new Date(product.created_at)) / (1000 * 60 * 60 * 24))} ngày trước`
                                    : ''
                                }
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetailMain;
