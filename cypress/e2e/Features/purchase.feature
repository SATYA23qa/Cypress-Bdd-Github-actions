Feature: Product Purchase 

  Scenario: User adds a product to the cart and completes checkout
    Given I open the Rahul Shetty Academy website
    When I navigate to the "Shop" page
    And I add "Samsung Note 8" to the cart
    And I proceed to checkout
    And I enter "India" as the delivery country
    And I place the order
    Then I should see a success message