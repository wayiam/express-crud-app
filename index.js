import express from "express";

const app = express();

app.use(express.json());

let items = [];
let nextItem = 0;

const port = 3000;
//Add mew item
app.post("/items", (req, res) => {
    const { itemName, price } = req.body;
    const newItem = { id: nextItem++, itemName, price };
    items.push(newItem);
    res.status(200).send(newItem);
});

// Get all items
app.get("/items", (req, res) => {
    res.status(200);
    res.send(items);
});


//Get a item with  ID
app.get("/items/:id", (req, res) => {
    const item = items.find((item) => item.id === parseInt(req.params.id));
    if (!item) {
        return res.status(404).send("Item not found");
    }
    res.status(200).send(item);
});


//Update items

app.put('/items/:id', (req, res) => {
    console.log(req.params.id);
    const item = items.find((item) => item.id === parseInt(req.params.id));
    if (!item) {
        return res.status(404).send("Item not found");
    }
    const { itemName, price } = req.body;
    item.itemName = itemName;
    item.price = price;
    res.send(200).send(item);
})

//Delete item
app.delete('/items/:id', (req, res) => {
    const index = items.findIndex(i => i.id === parseInt(req.params.id))
    if (index === -1) {
        return res.status(404).send('Item not found');
    }
    items.splice(index, 1);
    return res.send('deleted')
})


app.listen(port, () => {
    console.log("listening on port", port);
});