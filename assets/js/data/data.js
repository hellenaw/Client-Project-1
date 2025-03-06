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

export const prices = {
    wet: 3.99,
    dry: 2.99,
    chicken: 1.99,
    salmon: 2.49,
    driedAnchovy: 1.49,
    quailEggYolks: 2.29
};



//id acts as the unique identifier for the input field.
//it allows JavaScript to find and manipulate the field using document.getElementById("name").
export const checkoutFields = [
    { id: "name", label: "Full Name", type: "text", placeholder: "Enter your full name" },
    { id: "email", label: "Email", type: "email", placeholder: "Enter your email" },
    { id: "phone", label: "Phone Number", type: "text", placeholder: "123-4567" },
    { id: "address", label: "Address", type: "text", placeholder: "Enter your shipping address" },
    { id: "credit-card", label: "Credit Card Number", type: "text", placeholder: "XXXX-XXXX-XXXX-XXXX" }
];

//The label is used to describe the input field.