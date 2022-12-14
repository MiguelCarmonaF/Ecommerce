const data = {
    users:[
        {
            name: "Juan",
            email: "juan123@example.com",
            password: "123456",
            isAdmin: true,
        },
        {
            name: "Juana",
            email: "juana123@example.com",
            password: "654321",
            isAdmin: false,
        },
    ],
    products: [
        {
            name: "Free shirt",
            slug: "Free-shirt",
            category: "shirts",
            image: "/images/shirt1.jpg",
            price: 72.30,
            brand: "Nike",
            rating: 4.5,
            numReviews: 8,
            countInStock: 20,
            description: "A popular shirt",
        },
        {
            name: "Fit shirt",
            slug: "Fit-shirt",
            category: "Shirts",
            image: "/images/shirt2.jpg",
            price: 80.50,
            brand: "Adidas",
            rating: 3.2,
            numReviews: 10,
            countInStock: 20,
            description: "A beautiful shirt",
        },
        {
            name: "Slim shirt",
            slug: "Slim-shirt",
            category: "shirts",
            image: "/images/shirt3.jpg",
            price: 90,
            brand: "Cuidado con el perro",
            rating: 5,
            numReviews: 13,
            countInStock: 20,
            description: "A popular shirt",
        },
        {
            name: "Golf Pants",
            slug: "Golf-pants",
            category: "Pants",
            image: "/images/pants1.jpg",
            price: 90.40,
            brand: "Oliver",
            rating: 25,
            numReviews: 23,
            countInStock: 20,
            description: "Smart looking pants",
        }
    ]
}

export default data;