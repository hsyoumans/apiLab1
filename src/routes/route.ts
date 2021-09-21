// require the express module
import express from "express";

//create the cart array
interface cart {
    id: number;
    product: string;
    price: number;
    quantity: number;
}

// create a new Router object
const routes = express.Router();

//create the hard coded array of items
const items: cart[] = [
    {id:1, product: "dog", price: 250, quantity: 1},
    {id:2, product: "cat", price: 200, quantity: 1},
    {id:3, product: "boa", price: 500, quantity: 1},
    {id:4, product: "chinchilla", price: 300, quantity: 1},
    {id:5, product: "goat", price: 50, quantity:3},
    {id:6, product: "horse", price: 30000, quantity: 1},
    {id:7, product: "parrot", price: 800, quantity: 2},
    {id:8, product: "ferret", price: 25, quantity: 3},
    {id:9, product: "python", price: 600, quantity: 1},
    {id:10, product: "iguana", price: 65, quantity: 2},
    {id:11, product: "turtle", price: 15, quantity: 5},
    {id:12, product: "dwarf african frog", price: 1, quantity: 5},
];

let counter = items.length + 1;
 
//get the endpoint and return the array of items
routes.get('/items', (req, res) => {
    items.push(req.body);
    //res.render('search', {items});
    res.json(items);
});

//get the max price
routes.get('/maxPrice', (req, res) => {
    if(req.query.price) {
        const price = Number(req.query.price);
        const itemLessThanOrE = items.filter((item) => item.price <= price);
        if (itemLessThanOrE.length === 0) {
            res.status(404);
            res.end;
        }
        else {
            res.json(itemLessThanOrE);
        }
    }
});

//get the items with the correct prefix
routes.get('/prefix', (req, res) => {
    if(req.query.product) {
        const prod = String(req.query.product);
        const prefixStartWith = items.filter((item) => item.product.startsWith(prod));
        if (prefixStartWith.length === 0) {
            res.status(404);
            res.end;
        }
        else {
            res.json(prefixStartWith);
        }
    }
});

//get the item by number of items
routes.get('/pageSize', (req, res) => {
    if(req.query.id) {
        const ids = Number(req.query.id);
        const totPages = items.slice(0, ids);
        if(totPages.length === 0) {
            res.status(404);
            res.end;
        }
        else {
            res.json(totPages);
        }
    }
});

//get the item by id
routes.get('/items/:id', (req, res) => {
    const ids = Number(req.params.id);
    const item = items.find((item) => item.id === ids);
    if(item) {
        res.json(item);
    }
    else {
        res.status(404);
        res.end;
    }
    
});

//add a new item to the array
routes.post('/items', (req, res) => {
    const cartItem: cart = {id: counter, ...req.body};
    items.push(cartItem);
    counter++;
    res.json(items);
    res.status(201);
});

//find an item in the array and update it
routes.put('/items/:id', (req, res) => {
    let prods = items.findIndex((prods) => prods.id === Number(req.params.id));
    items[prods] = {id: Number(req.params.id), ...req.body};
    
    res.status(200).end();
});

//find and item in the array and delete it
routes.delete('/items/:id', (req, res) => {
    let idIndex = items.findIndex((item) => item.id === Number(req.params.id));
    items.splice(idIndex, 1);
    res.status(204).end();
});
 
export default routes;