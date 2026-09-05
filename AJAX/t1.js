const requestURL = 'https://reqres.in/api/users/1';

async function getUser() {
    const response = await fetch(requestURL, {
        headers: {
            'x-api-key': 'reqres-free-v1',
        },
    });
    const data = await response.json();
    console.log(data);
}
getUser();