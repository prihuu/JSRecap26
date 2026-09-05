const requestURL = 'https://reqres.in/api/users';

async function createUser() {
    const response = await fetch(requestURL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'x-api-key': 'reqres-free-v1',
        },
        body: JSON.stringify({
            name: 'Princess Awahnde',
            job: 'Student',
        }),
    });
    const data = await response.json();
    console.log(data)
}
createUser();