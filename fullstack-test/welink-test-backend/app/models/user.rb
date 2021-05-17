# frozen_string_literal

class User < ApplicationRecord
  has_many :feedbacks

  validates :firstname, :lastname, presence: true
  validates :email, presence: true, uniqueness: true
  validates :email, format: { with: /\A(.+)@(.+)\z/, message: 'not valid' }
end
