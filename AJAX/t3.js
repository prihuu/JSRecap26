const requestURL = 'https://reqres.in/api/unknown/23';

async function getData() {
    try {
        const response = await fetch(requestURL, {
            headers: {
                'x-api-key': 'reqres-free-v1'
            }
        });
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        console.log(data);
    }   catch (error) {
        console.error('Error:', error.message);
    }
}
getData();