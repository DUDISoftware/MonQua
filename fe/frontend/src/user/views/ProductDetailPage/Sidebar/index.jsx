import React from 'react';
import GiverInfo from './GiverInfo.jsx';
import ProductReviews from './ProductReviews.jsx';
import FeaturedPosts from './FeaturedPosts.jsx';
import ProductTags from './ProductTags.jsx';

const Sidebar = ({ giver, product, categories }) => {
    return (
        <div className="space-y-6">
            <GiverInfo
                user={giver}
                contactPhone={product?.contact_phone}
                contactZalo={product?.contact_zalo}
                productId={product?._id}
            />

            <ProductReviews productId={product?._id} />

            <FeaturedPosts />

            <ProductTags
                categoryName={product?.category_name}
                categories={categories}
                product={product}
            />
        </div>
    );
};

export default Sidebar;
