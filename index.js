let btn = document.querySelector("button");
let div6 = document.getElementById("1");
let div7 = document.getElementById("2");
let div8 = document.getElementById("3");
let div9 = document.getElementById("4");
let div10 = document.getElementById("5");

let div1 = document.getElementById("6");
let div2 = document.getElementById("7");
let div3 = document.getElementById("8");
let div4 = document.getElementById("9");
let div5 = document.getElementById("10");

btn.addEventListener("click", () => {
  let cityname = document.getElementById("city").value;
  let arr = [];
  let divs = [div1, div2, div3, div4, div5]; 
  let divs1 = [div6, div7, div8, div9, div10];
  let url = `https://api.openweathermap.org/data/2.5/forecast?q=${cityname}&appid=c10881cc4d2b49b66f6a9965edc60240`;

  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      for (let i = 0; i < 5; i++) {
        let DateTime = data.list[i].dt_txt;
        let Description = data.list[i].weather[0].description.toLowerCase();
        let Wind = data.list[i].wind.speed;
        let Temperature = Math.round(data.list[i].main.temp - 273.15);
        let Humidity = data.list[i].main.humidity;
        
        arr.push({
          DateTime,
          Description,
          Wind: `${Wind}m/s`,
          Temperature: Temperature,
          Humidity: `${Humidity}%`
        });

        divs1[i].innerText = `
            DateTime: ${arr[i].DateTime}, 
            Temp: ${arr[i].Temperature}°C,
            Description: ${arr[i].Description}, 
            Wind: ${arr[i].Wind},  
            Humidity: ${arr[i].Humidity}`;

        if (arr[i].Description=="overcast clouds") {
          divs[i].style.backgroundImage = "url('./overcast.gif')";
        } else if (arr[i].Description.includes("rain")) {
          divs[i].style.backgroundImage = "url('./rain1.gif')";
        }  else if (arr[i].Description.includes("sun")) {
          divs[i].style.backgroundImage = "url('./sun.gif')";
        }else if (arr[i].Description=="clear sky" && arr[i].Temperature>=40 ) {
          divs[i].style.backgroundImage = "url('./sun.gif')";
        }else if (arr[i].Description=="clear sky") {
          divs[i].style.backgroundImage = "url('./clearSky.gif')";
        }else if (arr[i].Description=="broken clouds") {
          divs[i].style.backgroundImage = "url('./brokenclouds.gif')";
        }else if (arr[i].Description=="few clouds") {
          divs[i].style.backgroundImage = "url('./fewCloud.gif')";
        }else if (arr[i].Description=="scattered clouds") {
          divs[i].style.backgroundImage = "url('./scattered.gif')";
        } else {
          divs[i].style.backgroundColor = "lightcyan";
        }

        divs[i].style.backgroundSize = "cover";
        divs[i].style.backgroundPosition = "center";
      }
      for (let i = 0; i < 5; i++) {
        divs1[i].style.visibility = "visible"; 
      }

    })
    .catch(() => {
      alert("Unable to fetch data");
    });
});
