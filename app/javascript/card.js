const pay = () => {
  const payjp = Payjp('pk_test_fbe345fadabdaac05a6dc0a9')
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
    console.log("フォーム送信時にイベント発火")
    e.preventDefault();
  });
};

window.addEventListener("turbo:load", pay);