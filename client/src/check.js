const product = [
    {
        name : "arif"
    },
    {
        name : "faizan"

    },
    {
        name : "madhu"

    }
]
    
const filtered = product.filter((item) => item.name.includes("ar"));

console.log(filtered);