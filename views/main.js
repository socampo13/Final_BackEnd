const socket = io.connect();

socket.on("items", (data) => {
    document.getElementById("items").innerHTML = data
    .map(
        (entry) => `<div>
                        <strong>${entry.author}</strong>
                        <em>${entry.text}</em>
                    </div>`
    )
    .join(" ");
    clearInputs();
});

function clearInputs() {
    document.getElementById("producto").value = "";
    document.getElementById("texto").value = "";
};

function addProduct() {
    const product = {
        name: document.getElementById("producto"),
        price: document.getElementById("precio"),
        photo: document.getElementById("imagen")
    };

    socket.emit("new-item", items);

    return false;
}

