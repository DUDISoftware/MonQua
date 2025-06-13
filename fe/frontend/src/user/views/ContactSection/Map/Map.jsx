import React from "react";

const Map = () => (
    <div className="rounded-xl overflow-hidden shadow-product w-full h-64">
        <iframe
            title="DUDI Map"
            src="https://www.google.com/maps?q=232+Nguyễn+Thị+Minh+Khai,+Phường+Võ+Thị+Sáu,+Quận+3,+Thành+phố+Hồ+Chí+Minh,+Việt+Nam&output=embed"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
        ></iframe>
    </div>
);

export default Map;
