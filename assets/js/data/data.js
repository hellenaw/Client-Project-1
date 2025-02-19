export const selectData = {
    foodType: [
        { value: "wet", label: "Wet Food" },
        { value: "dry", label: "Dry Food" }
    ],
    broth: [
        { value: "chicken", label: "Chicken Broth" },
        { value: "salmon", label: "Salmon Broth" }
    ],
    foodFormula: [
        { value: "driedAnchovy", label: "Dried Anchovy" },
        { value: "quailEggYolks", label: "Quail Egg Yolks" }
    ]
};

// ✅ Ensure this is exported correctly
export const checkoutFields = [
    { id: "name", label: "Full Name", type: "text", placeholder: "Enter your full name" },
    { id: "email", label: "Email", type: "email", placeholder: "Enter your email" },
    { id: "phone", label: "Phone Number", type: "text", placeholder: "123-4567" },
    { id: "address", label: "Address", type: "text", placeholder: "Enter your shipping address" },
    { id: "credit-card", label: "Credit Card Number", type: "text", placeholder: "XXXX-XXXX-XXXX-XXXX" }
];