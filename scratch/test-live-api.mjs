async function testLiveApi() {
  const res = await fetch('https://www.maximorashop.com/api/marlboro/users/credit', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userId: 'bdf589e0-185f-4e26-aa47-710a00ec7dda', balance: 75 })
  });
  console.log(res.status);
  console.log(await res.text());
}
testLiveApi();
