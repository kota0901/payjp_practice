class Order < ApplicationRecord
  #ordersテーブルにtokenカラムは存在しないが、「attr_accessor」により使用することができる
  attr_accessor :token
  validates :price, presence: true
  validates :token, presence: true
end
