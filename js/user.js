// let profile = document.getElementById('profile')
// let price = document.getElementById('price')

// let profileput = document.getElementById('profile-put')
// let priceput = document.getElementById('pricre-put')

// priceput.addEventListener('click',function()
// {
//     profile.style.display='none'
//     price.style.display='block'
// })

// profileput.addEventListener('click',function()
// {
//     profile.style.display='block'
//     price.style.display='none'
// })

// // profileput.style.display='none'
// // priceput.style.display='block'

// console.log(profile)
// console.log(price)
// console.log(profileput)
// console.log(priceput)
let user = localStorage.getItem("user");
if (!user) {
  location.href = "../index.html";
}
let access_token = localStorage.getItem("access_token");

// ..................................................
let PROFILE = document.getElementById("PROFILE");

let cick = document.getElementById("cick");

let MYPROFILE = document.getElementById("MYPROFILE");

let clickher = document.getElementById("click-her");

cick.addEventListener("click", function () {
  clickher.style.display = "block";
  MYPROFILE.style.display = "none";
});
// ...............................

PROFILE.addEventListener("click", function () {
  clickher.style.display = "none";
  MYPROFILE.style.display = "block";
});
function returnError(text, id) {
  let ele = document.getElementById(id);
  let msg = `${text}`;
  ele.innerText = msg;
  ele.style.color = "red";
}
function isValidPhoneNumber(phone) {
  var phoneNumberRegex =
    /^\+?(\d{1,3})?\s?\(?(\d{3})\)?[-.\s]?(\d{3})[-.\s]?(\d{4})$/;
  return phoneNumberRegex.test(phone);
}

let name_ = document.getElementById("name_"),
  nameF = document.getElementById("name"),
  email = document.getElementById("email"),
  id = document.getElementById("id"),
  phone = document.getElementById("phone"),
  password = document.getElementById("password"),
  editInfo = document.getElementById("editInfo");

function fillInfo() {
  name_.innerText = JSON.parse(user).name;
  nameF.value = JSON.parse(user).name;
  email.innerText = JSON.parse(user).email;
  phone.value = JSON.parse(user).phone;
  id.innerText = JSON.parse(user).id;
}
fillInfo();
editInfo.addEventListener("click", (e) => {
  e.preventDefault();
  let st = true;
  let data = {};
  if (nameF.value == "" || nameF.length < 8) {
    returnError("Name cannot empty Or less than 8 letters", "nameErr");
    st = false;
  } else {
    returnError("", "nameErr");
    data.name = nameF.value;
  }
  if (phone.value == "") {
    returnError("Phone Name Required", "phoneErr");
    st = false;
  }
  if (!isValidPhoneNumber(phone.value)) {
    returnError("Phone format is invalid", "phoneErr");
    st = false;
  } else {
    returnError("", "phoneErr");
    data.phone = phone.value;
  }
  if (password.value != "") {
    if (password.value.length < 8) {
      returnError("Password is too short", "passErr");
      st = false;
    } else {
      returnError("", "passErr");
      data.password = password.value;
    }
  }

  if (st) {
    //
    postData(APIs.host + APIs.user.edit, data, access_token).then((data) => {
      localStorage.setItem(
        "user",
        JSON.stringify({
          name: data["data"].user.name,
          email: data["data"].user.email,
          phone: data["data"].user.phone,
          id: data["data"].user.id_document,
        })
      );
      if (data["data"].user.email_verified_at == null) {
        localStorage.setItem("email_verify", false);
      }
      name_.innerText = data["data"].user.name;
      nameF.value = data["data"].user.name;
      email.innerText = data["data"].user.email;
      phone.value = data["data"].user.phone;
      id.innerText = data["data"].user.id_document;
      if (data.status === 201) {
        let success = document.getElementById("success_a");
        success.innerText = "Profile Updated Successfully";
        success.style.display = "block";
        setTimeout(() => {
          success.style.display = "none";
        }, 2000);
        password.value = "";
      } else {
        let success = document.getElementById("success_a");
        success.innerText = "Profile Updated Failed";
        success.style.backgroundColor = "red";
        success.style.display = "block";
        setTimeout(() => {
          success.style.display = "none";
        }, 2000);
      }
    });
  }
});
let ordersCon = document.getElementById("orders");
let btn = false;
getData(APIs.host + APIs.user.orders, access_token).then((data) => {
  let color = "";
  data["data"].forEach((e) => {
    switch (e.order_status) {
      case "processing":
        color = "#ffc107";
        break;
      case "rejected":
        color = "rgb(220,53,69)";
        break;
      case "canceled":
        color = "rgb(220,53,69)";
        break;
      case "accepted":
        color = "rgb(25,135,84)";
        break;
      case "completed":
        color = "rgb(25,135,84)";
        break;
    }

    let str = APIs.host + "/public/" + e.car.image;
    let details = "";
    e.order_details.forEach((e) => {
      details += `<tr>
      <td class="text-left">${e.title}</td>
      <td class="text-left">${
        e.period === 0 ? "One Time" : e.period + " days"
      } </td>
      <td class="text-left">${e.price} $</td>
      <td class="text-left">${
        e.price * e.period === 0 ? e.price : e.price * e.period
      } $</td>
    </tr>`;
    });
    let order = `
    <div class="accordion">
        ${
          e.order_status === "processing"
            ? `<button
              class="button-del cancleBtn"
              onclick="cancleOrder(event,${e.id},'st-${e.id}');"
              style="background: #eee;"
            >
              <svg
                id="exit"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 32 32"
              >
                <path
                  fill="#191919"
                  d="M31 2.237L28.763 0 15.5 13.263 2.237 0 0 2.237 13.263 15.5 0 28.763 2.237 31 15.5 17.737 28.763 31 31 28.763 17.737 15.5z"
                ></path>
              </svg>
              الغاء
            </button>`
            : ""
        }
          <div class="accordion-item">
            <div class="buot">
              <div class="img"><img src="${str}" alt="" /></div>
              <div class="name-car">
                <h2>${e.car.brand + " " + e.car.model} </h2>
                <p>${e.car.car_type + " | " + e.car.transmission}</p>
              </div>
              <div class="total-price">
                <h2 class="price"><span>الاجمالي: </span>${e.total_cost}$</h2>
                ${
                  e.code
                    ? `<h2 class="price" style="font-size:12px;margin:0 15px"><span>Coupon: </span>${e.code}</h2>`
                    : ""
                }
                
              </div>

              <div class="opcion"><p style="text-transform: capitalize;" >حالة الطلب: <strong id="st-${
                e.id
              }" style="color:${color}">
              ${e.order_status} 
              </strong>
              </p></div>
              <div class="put">

                <button class="collapseEl" aria-expanded="false" id="accordion-button-${
                  e.id
                }">
                  <span class="icon" id="collapseBtn" data-collabse="accordion-button-${
                    e.id
                  }" aria-hidden="false"></span>
                </button>
                <div class="accordion-content">
                 
                  <table class="table-fill">
                    <thead>
                      <tr>
                        <th class="text-left">العنوان</th>
                        <th class="text-left">المدة</th>
                        <th class="text-left">السعر</th>
                        <th class="text-left">الاجمالي</th>
                      </tr>
                    </thead>
                    <tbody class="table-hover">
                      ${details}
                    </tbody>
                  </table>
                </div>
                <!-- ................end-tebal -->
              </div>
            </div>
          </div>
        </div>
    `;
    ordersCon.innerHTML += order;
  });
  btn = true;
});

function cancleOrder(event, id, e) {
  let data = { order_status: "cancel" };
  let ele = document.getElementById(e);
  postData(APIs.host + APIs.user.cancle + `/${id}`, data, access_token).then(
    (data) => {
      if (data.status === 201) {
        ele.innerText = "canceled";
        ele.style.color = "rgb(220,53,69)";
        event.target.remove();
        let success_c = document.getElementById("success_c");
        success_c.innerText = "Order Canceled!";
        success_c.style.display = "block";
        setTimeout(() => {
          success_c.style.display = "none";
          success_c.innerText = "";
        }, 2000);
      }
    }
  );
}
document.body.addEventListener("click", (e) => {
  if (e.target.getAttribute("id") === "collapseBtn") {
    let btn = document.getElementById(e.target.dataset.collabse);
    if (btn.getAttribute("aria-expanded") === "true") {
      btn.setAttribute("aria-expanded", "false");
    } else if (btn.getAttribute("aria-expanded") === "false") {
      btn.setAttribute("aria-expanded", "true");
    }
  }
});
