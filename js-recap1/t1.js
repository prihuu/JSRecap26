let celsius = Number(prompt("Enter temperature in Celsius:"));

        let fahrenheit = (celsius * 9 / 5) + 32;

        let kelvin = celsius + 273.15;

        document.getElementById('result').innerHTML =
            "Temperature in Celsius: "+celsius + " °C<br>" +
            "Temperature in Fahrenheit: "+fahrenheit + " °F<br>" +
            "Temperature in Kelvin: " + kelvin + " K";