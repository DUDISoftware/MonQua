import React from "react";

const ConditionSelect = ({ value, onChange, name }) => {
    const conditions = [
        { value: "Mới", label: "Mới" },
        { value: "Còn mới 90%", label: "Còn mới 90%" },
        { value: "Còn mới 70%", label: "Còn mới 70%" },
        { value: "Đã sử dụng", label: "Đã sử dụng" }
    ];

    return (
        <div>
            <label className="block font-semibold text-[#17805C] mb-1">Tình trạng</label>
            <select
                name={name}
                value={value}
                onChange={onChange}
                className="w-full border border-[#B9E5C9] rounded-full px-4 py-2"
            >
                {conditions.map(condition => (
                    <option key={condition.value} value={condition.value}>
                        {condition.label}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default ConditionSelect;
