window.addEventListener("load", fetchOrdersList);
fetchLoad = false;
let ordersLength;
let firstOrdersLength;

const urlFetch = `https://reicpe-9cc2.restdb.io/rest/killer-kebab-orders?q={}&h={"$orderby": {"dateO": 1, "timeO": 1}}`;

function fetchOrdersList() {
  fetch(urlFetch, {
    method: "GET",
    headers: {
      "x-apikey": "606d5dcef5535004310074f4",
    },
  })
    .then((res) => res.json())
    .then((response) => {
      // console.log(response);
      ordersLength = response.length;

      if (!fetchLoad) {
        fetchLoad = true;
        firstOrdersLength = ordersLength;

        showOrdersList(response);
      } else {
        if (ordersLength != firstOrdersLength) {
          console.log("hola lista mas larga");
          location.href = "admin.html";
        }
      }
      // console.log(firstOrdersLength);
      // console.log(ordersLength);
    })
    .catch((err) => {
      console.error(err);
    });

  setTimeout(fetchOrdersList, 60000);
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
    // copy.querySelector(
    //   ".pickUp .dateTime"
    // ).value = `${datePickUp}T${timePickUp}`;
    copy
      .querySelector(".inputContainer input")
      .setAttribute("id", `p-${order._id}`);
    copy
      .querySelector(".inputContainer input")
      .setAttribute("data-id", order._id);
    copy
      .querySelector(".inputContainer label")
      .setAttribute("for", `p-${order._id}`);

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
    let parent;
    if (order.pickedUp) {
      copy.querySelector(".pickUpForm").remove();
      parent = document.querySelector(".done .ordersContainer");
      parent.insertBefore(copy, parent.childNodes[0]);
    } else {
      parent = document.querySelector(".toDo .ordersContainer");
      parent.appendChild(copy);
    }

    //append
  });
  document.querySelectorAll(".pickUpForm").forEach((e) => {
    e.addEventListener("submit", handleSubmit);
  });
}

const handleSubmit = (e) => {
  e.preventDefault();
  console.log("submite");
  console.log(e.target.querySelector("input").dataset.id);

  orderID = e.target.querySelector("input").dataset.id;
  fetch(`https://reicpe-9cc2.restdb.io/rest/killer-kebab-orders/${orderID}`, {
    method: "PATCH",
    headers: {
      "x-apikey": "606d5dcef5535004310074f4",
      "Content-Type": "application/json",
    },
    body: '{"pickedUp":true}',
  })
    .then((response) => {
      console.log(response);
      location.href = `admin.html`;
    })
    .catch((err) => {
      console.error(err);
    });
};
