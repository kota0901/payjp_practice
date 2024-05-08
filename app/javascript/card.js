const pay = () => {
  const publicKey = gon.public_key
  const payjp = Payjp(publicKey)
  //「elementsメソッド」：フォームを生成するためのcreate()メソッドを使える。このメソッドは入力フォームを作成できる。
  const elements = payjp.elements();
  const numberElement = elements.create('cardNumber');
  const expiryElement = elements.create('cardExpiry');
  const cvcElement = elements.create('cardCvc');
  //「mountメソッド」：指定したidをelementが持っているフォームと置き換えることができる
  numberElement.mount('#number-form');
  expiryElement.mount('#expiry-form');
  cvcElement.mount('#cvc-form');

  const form = document.getElementById('charge-form')
  form.addEventListener("submit", (e) => {
    //then以降はトークンを受け取った後の処理
    payjp.createToken(numberElement).then(function (response) {
      if (response.error) {
      } else {
        const token = response.id;
        const renderDom = document.getElementById("charge-form");
        const tokenObj = `<input value=${token} name='token' type="hidden">`;
        renderDom.insertAdjacentHTML("beforeend", tokenObj);
      }
      numberElement.clear();
      expiryElement.clear();
      cvcElement.clear();
      document.getElementById("charge-form").submit();
    });
    //以下記述によりサーバーサイドへの送信を止めているが、前述の「document.getElementById("charge-form").submit();」によりサーバーサイドへフォーム情報が送信される
    e.preventDefault();
  });
};

window.addEventListener("turbo:load", pay);