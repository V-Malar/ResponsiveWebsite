function order(id) {
  let url = "https://6411afc9b6067ba2f141c0e3.mockapi.io/menu";
  console.log(id);
  console.log(document.getElementById("food" + id).innerHTML + " " + document.getElementById("price" + id).innerHTML);
  let data = {
    item: document.getElementById("food" + id).innerHTML,
    price: document.getElementById("price" + id).innerHTML,
  }
  const req = new XMLHttpRequest();

  req.open('POST', url);

  req.setRequestHeader("Content-Type", "application/json");

  req.addEventListener('load', function () {
    alert("Saved succesfully");
  });
  var deletemenu = document.querySelector('.menu' + id);
  var btn = document.createElement("BUTTON");
  btn.innerHTML = "VIEW ORDER";
  // alert(location.hostname);
  deletemenu.appendChild(btn);
  req.send(JSON.stringify(data));
  btn.onclick = function () {
    var xml = new XMLHttpRequest();

    console.log('after create obj', xml.readyState)

    let url = "https://6411afc9b6067ba2f141c0e3.mockapi.io/menu";
    xml.open('GET', url);

    console.log("after open", xml.readyState);

    xml.onload = function () {
      let data = xml.responseText;
      let convert_data = JSON.parse(data);
      console.log("convert_data", convert_data);
      let orderdetails = document.querySelector('.orderdetails');
      for (let i = 0; i < convert_data.length; i++) {
        let label = document.createElement('label');
        let button = document.createElement('button');
        button.innerHTML = "DELETE";
        label.innerHTML = "ID: " + convert_data[i].id + "<br/>PRICE: $" + (parseInt(convert_data[i].price) * (50 / 100));
        deletemenu.appendChild(label);
        deletemenu.appendChild(button);
        button.onclick = function () {
          req.open('DELETE', "https://6411afc9b6067ba2f141c0e3.mockapi.io/menu/" + convert_data[i].id);
          alert("ORDER DELETED. See you Again..");
          req.send();
          deletemenu.removeChild(label);
          deletemenu.removeChild(button);
        }
      }
    }
    xml.send();
    deletemenu.removeChild(btn);
  };
}