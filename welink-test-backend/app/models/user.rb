# frozen_string_literal

class User < ApplicationRecord
  has_many :feedbacks

  scope :ordered, ->(x, y) { User.order(x => y) }
  validates :firstname, :lastname, presence: true
  validates :email, presence: true, uniqueness: true
  accepts_nested_attributes_for :feedbacks, allow_destroy: true
end
