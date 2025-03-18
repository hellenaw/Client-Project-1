export const selectData = {
    Type: ["wet", "dry"],
    Broth: ["chicken", "salmon"],
    Additions: ["anchovy", "egg"]
};

export const prices = {
    wet: 3.99,
    dry: 2.99,
    chicken: 1.99,
    salmon: 2.49,
    driedAnchovy: 1.49,
    quailEggYolks: 2.29
};

export const checkoutFields = [
    { id: "name", label: "Full Name", type: "text", placeholder: "Enter your full name" },
    { id: "email", label: "Email", type: "email", placeholder: "Enter your email" },
    { id: "phone", label: "Phone Number", type: "text", placeholder: "123-4567" },
    { id: "address", label: "Address", type: "text", placeholder: "Enter your shipping address" },
    { id: "credit-card", label: "Credit Card Number", type: "text", placeholder: "XXXX-XXXX-XXXX-XXXX" }
];