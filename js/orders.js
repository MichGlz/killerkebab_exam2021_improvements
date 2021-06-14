window.addEventListener("load", fetchOrdersList);

const urlFetch = "https://reicpe-9cc2.restdb.io/rest/killer-kebab-orders";

function fetchOrdersList() {
  fetch(urlFetch, {
    method: "GET",
    headers: {
      "x-apikey": "606d5dcef5535004310074f4",
    },
  })
    .then((res) => res.json())
    .then((response) => {
      console.log(response);
      showOrdersList(response);
    })
    .catch((err) => {
      console.error(err);
    });
}

function showOrdersList(orders) {
  let parent;
  //header

  //grab the template
  const template = document.querySelector("template.orderTemplate").content;
  orders.forEach((order) => {
    //clone
    const copy = template.cloneNode(true);
    //adjust stuff

    copy.querySelector(".name").textContent = order.customer[0].name;
    copy.querySelector(".mobile").textContent = order.customer[0].telephoneNo;
    copy.querySelector(".eMail").textContent = order.customer[0].email;
    let datePickUp = order.dateO;
    datePickUp = datePickUp.split("T")[0];
    copy.querySelector(".pickUp .date").value = datePickUp;
    let timePickUp = order.timeO;
    timePickUp = timePickUp.split("T")[1];
    timePickUp = timePickUp.split(".")[0];
    copy.querySelector(".pickUp .time").value = timePickUp;
    order.cart.forEach((p) => {
      if (p.category === "combo") {
        copy.querySelector(
          ".products"
        ).innerHTML += `<li>${p.qty} / ${p.product} ${p.description}</li>`;
      } else {
        copy.querySelector(
          ".products"
        ).innerHTML += `<li>${p.qty} / ${p.product}</li>`;
      }
    });

    //grab the proper parent for
    const parent = document.querySelector(".toDo .ordersContainer");
    //append
    parent.appendChild(copy);
  });
}
