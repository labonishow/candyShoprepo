const itemList = document.getElementById("itemList");
window.addEventListener("DOMContentLoaded", () => {
  axios
    .get("https://crudcrud.com/api/12565b0760d5434ba08beb0b9547edc3/candyshop")
    .then((res) => {
      for (var i = 0; i < res.data.length; i++) {
        displayCandy(res.data[i]);
      }
    })
    .catch((error) => {
      console.log(error);
    });
});
function handleFormSubmit(event) {
  event.preventDefault();

  const candyName = event.target.candyname.value;
  const description = event.target.description.value;
  const price = event.target.price.value;
  const quantity = Number(event.target.quantity.value);

  const candy = {
    candyName,
    description,
    price,
    quantity,
  };
  axios
    .post(
      "https://crudcrud.com/api/12565b0760d5434ba08beb0b9547edc3/candyshop",
      candy,
    )
    .then((res) => {
      console.log(res);
      displayCandy(res.data);
      document.getElementById("candyname").value = "";
      document.getElementById("description").value = "";
      document.getElementById("price").value = "";
      document.getElementById("quantity").value = "";
    })
    .catch((error) => {
      console.log(error);
    });
}

function displayCandy(candy) {
  const candyItem = document.createElement("li");

  candyItem.appendChild(
    document.createTextNode(
      `${candy.candyName} - ${candy.description} - RS${candy.price} - Quantity: ${candy.quantity} `,
    ),
  );

  const buy1Btn = document.createElement("button");
  buy1Btn.appendChild(document.createTextNode("Buy 1"));
  buy1Btn.className = "btn btn-success btn-sm ms-2";
  candyItem.appendChild(buy1Btn);
  function updateUI(candyItem, candy) {
    candyItem.firstChild.textContent = `${candy.candyName} - ${candy.description} - RS${candy.price} - Quantity: ${candy.quantity} `;
  }
  function updateCandyQuantity(newQuantity) {
    return axios.put(
      `https://crudcrud.com/api/12565b0760d5434ba08beb0b9547edc3/candyshop/${candy._id}`,
      {
        candyName: candy.candyName,
        description: candy.description,
        price: candy.price,
        quantity: newQuantity,
      },
    );
  }
  buy1Btn.addEventListener("click", function () {
    if (candy.quantity === 0) {
      alert("Out of Stock!");
    } else if (candy.quantity >= 1) {
      const updatedQty = candy.quantity - 1;
      updateCandyQuantity(updatedQty)
        .then(() => {
          candy.quantity = updatedQty;
          updateUI(candyItem, candy);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  });
  const buy2Btn = document.createElement("button");
  buy2Btn.appendChild(document.createTextNode("Buy 2"));
  buy2Btn.className = "btn btn-warning btn-sm ms-2";
  candyItem.appendChild(buy2Btn);
  buy2Btn.addEventListener("click", function () {
    if (candy.quantity === 0) {
      alert("Out of Stock!");
    } else if (candy.quantity >= 2) {
      const updatedQty = candy.quantity - 2;
      updateCandyQuantity(updatedQty)
        .then(() => {
          candy.quantity = updatedQty;
          updateUI(candyItem, candy);
        })
        .catch((error) => {
          alert(error);
        });
    }
  });
  const buy3Btn = document.createElement("button");
  buy3Btn.appendChild(document.createTextNode("Buy 3"));
  buy3Btn.className = "btn btn-danger btn-sm ms-2";
  candyItem.appendChild(buy3Btn);
  buy3Btn.addEventListener("click", function () {
    if (candy.quantity === 0) {
      alert("Out of Stock!");
    } else if (candy.quantity >= 3) {
      const updatedQty = candy.quantity - 3;
      updateCandyQuantity(updatedQty)
        .then(() => {
          candy.quantity = updatedQty;
          updateUI(candyItem, candy);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  });

  itemList.appendChild(candyItem);
}
