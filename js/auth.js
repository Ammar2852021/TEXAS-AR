// Register
let signUpForm = document.getElementById("sign_up_form"),
  signUpSubmit = document.getElementById("sign_up_submit"),
  errorReg = document.getElementById("error"),
  checkmark = document.getElementById("checkmark");
if (signUpSubmit) {
  signUpSubmit.addEventListener("click", function (event) {
    event.preventDefault();
    error.innerHTML = "";

    // Accessing the form fields
    const firstName = signUpForm.elements["firstName"].value,
      lastName = signUpForm.elements["lastName"].value,
      email = signUpForm.elements["email"].value,
      phone = signUpForm.elements["phone"].value,
      password = signUpForm.elements["password"].value,
      password_confirm = signUpForm.elements["password_confirm"].value,
      id = signUpForm.elements["id"].value,
      terms = signUpForm.elements["terms"];

    function returnError(text) {
      let msg = `<span style="margin-bottom: 12px;
        background: #003f82;
        color: #ffffff;
        padding: 10px 16px;
        display: block;
        width: 83%;
        border-radius: 9px;">${text}!</span>`;
      return msg;
    }
    function isValidPhoneNumber(phone) {
      var phoneNumberRegex =
        /^\+?(\d{1,3})?\s?\(?(\d{3})\)?[-.\s]?(\d{3})[-.\s]?(\d{4})$/;
      return phoneNumberRegex.test(phone);
    }
    // function isValidNationalNumber(nationalNumber) {
    //   var nationalNumberRegex = /^[A-Za-z0-9]{6,12}$/;

    //   return nationalNumberRegex.test(nationalNumber);
    // }

    // function isValidPassportNumber(passportNumber) {
    //   var passportNumberRegex = /^(?:([A-Z\d])(?!.*\1)){5,20}$/;

    //   return passportNumberRegex.test(passportNumber);
    // }
    if (firstName == "") {
      error.innerHTML = returnError("الاسم الأول مطلوب");
    } else if (lastName == "") {
      error.innerHTML = returnError("الاسم الأخير مطلوب");
    } else if (email == "") {
      error.innerHTML = returnError("اسم البريد الإلكتروني مطلوب");
    } else if (phone == "") {
      error.innerHTML = returnError("اسم الهاتف مطلوب");
    } else if (!isValidPhoneNumber(phone)) {
      error.innerHTML = returnError("تنسيق الهاتف غير صالح مطلوب");
    } else if (password == "") {
      error.innerHTML = returnError("كلمة المرور مطلوبة");
    } else if (password.length < 8) {
      error.innerHTML = returnError("كلمة المرور قصيرة جدا");
    } else if (password_confirm != password) {
      error.innerHTML = returnError("كلمات المرور غير متطابقة");
    } else if (id == "") {
      error.innerHTML = returnError("رقم الهوية أو جواز السفر مطلوب");
    } else if (!terms.checked) {
      checkmark.style.border = "2px solid red";
    } else {
      let data = {
        name: firstName + " " + lastName,
        email: email,
        phone: phone,
        password: password,
        password_confirmation: password_confirm,
        id_document: id,
      };
      postData(APIs.host + APIs.user.register, data, null, "POST").then(
        (data) => {
          if (data.status === 400) {
            if (data["data"].email != undefined) {
              error.innerHTML = returnError(data["data"].email[0]);
            } else if (data["data"].id_document != undefined) {
              error.innerHTML = returnError(
                "The ID Or Passport Number has already been taken!"
              );
            } else if (data["data"].phone != undefined) {
              error.innerHTML = returnError(data["data"].phone[0]);
            }
          }
          if (data.status === 201) {
            location.href = "../page/log-in.html";
          }
        }
      );
    }
  });
}
// Login
let loginForm = document.getElementById("loginForm");
let error = document.getElementById("error");
if (loginForm) {
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    var email = loginForm.elements["email"].value,
      password = loginForm.elements["password"].value;
    error.innerHTML = "";
    if (email == "") {
      error.innerHTML += `البريد الالكتروني لا يمكن ان يكون فارغا`;
      // error.innerHTML = "cd";
    } else if (password == "") {
      error.innerHTML += `Password cannot be empty`;
    } else if (password.length < 8) {
      error.innerHTML += `لا يمكن أن تقل كلمة المرور عن 8 أحرف`;
    } else {
      let data = {
        email: email,
        password: password,
      };

      postData(APIs.host + APIs.user.login, data).then((data) => {
        if (data.status === 200) {
          localStorage.setItem("access_token", data.access_token);
          localStorage.setItem(
            "user",
            JSON.stringify({
              name: data.user.name,
              email: data.user.email,
              phone: data.user.phone,
              id: data.user.id_document,
            })
          );
          if (data.user.email_verified_at == null) {
            localStorage.setItem("email_verify", false);
          }
          location.href = "../page/user.html";
        } else if (data.status === 422) {
          error.innerText = data["data"].password[0];
          setTimeout(() => {
            error.innerText = "";
          }, 2000);
        } else if (data.status === 401) {
          error.innerHTML = `<span style="margin-bottom: 12px;
        background: #003f82;
        color: #ffffff;
        padding: 10px 16px;
        display: block;
        width: 83%;
        border-radius: 9px;"> البريد الإلكتروني أو كلمة المرور غير صحيحة!</span>`;
          error.classList.add("d-block");
          setTimeout(() => {
            error.classList.remove("d-block");
          }, 2000);
        }
      });
    }
  });
}
