require 'rails_helper'

RSpec.describe Order, type: :model do
  before do
    @order = FactoryBot.build(:order)
  end

  context '内容に問題ない場合' do
    it "priceとtokenがあれば保存ができること" do
      #学習用コメント：be_validは`valid?`を呼び出し、trueを返すかどうかを検証するメソッド。`true`を返す場合、そのオブジェクトは「有効」と判定され、データベースに保存できる状態
      expect(@order).to be_valid
    end
  end

  context '内容に問題がある場合' do
    it "priceが空では保存ができないこと" do
      @order.price = nil
      @order.valid?
      expect(@order.errors.full_messages).to include("Price can't be blank")
    end
  end
  
  it "tokenが空では登録できないこと" do
    @order.token = nil
    @order.valid?
    expect(@order.errors.full_messages).to include("Token can't be blank")
  end
end