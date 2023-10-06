describe("login page", () => {
  beforeEach(() => {
    cy.visit("/");
  });
  it("should login with valid email and password", () => {
    cy.login("test@test.com", "test");
    cy.contains("Добро пожаловать test@test.com").should("be.visible");
  });

  it("should not login with empty mail", () => {
    cy.login(null, "test");
    cy.get("#mail").then((elements) => {
      expect(elements[0].checkValidity()).to.be.false;
      expect(elements[0].validationMessage).to.be.eql("Заполните это поле.");
    });
  });

  it("should not login with empty password", () => {
    cy.login("test@test.com", null);
    cy.get("#pass").then((elements) => {
      expect(elements[0].checkValidity()).to.be.false;
      expect(elements[0].validationMessage).to.be.eql("Заполните это поле.");
    });
  });

  it("Should be able to open the main page", () => {
    // проверка отображения страницы
    cy.visit("/"); // открыть ссылку, это сокращённая версия (см ссылку в cypress.json)
    cy.contains("Books list"); // получаем текст из элемента
  });

  it("Should be able to add a book in Favorites", () => {
    // добавление книги в Избранное со стартовой страници
    cy.visit("/");
    cy.login("test@test.com", "test");
    cy.bookDescription(
      "Great Fight",
      "Fight Between Good And Evil",
      "Ellen White"
    );
    cy.contains("Great Fight"); // проверяем что книга отразилась на странице
    cy.contains("Add to favorite").click(); // кликаем по кнопке добавить
    cy.get("h4").click(); // заходим в Избранное
    cy.contains("Great Fight"); // проверяем что книга отразилась на странице в Избранном
  });

  it("Should be possible to add a book to Favorites when adding", () => {
    // попадание книги в Избранное при добавлении книги
    cy.visit("/");
    cy.login("test@test.com", "test");
    cy.addToFavoritesWhenAddingBook(
      "Преступление и наказание",
      " О жизни бедного студента решившегося на убийство",
      "Достоевский Ф.М."
    );
    cy.get("h4").click(); // заходим в Избранное
    cy.contains("Преступление и наказание"); // проверяем что книга отразилась на странице в Избранном
  });

  it("Should be possible to remove a book from favorites while on the start page", () => {
    // проверка возможности удаления книги из Избранного
    cy.visit("/");
    cy.login("test@test.com", "test");
    cy.addToFavoritesWhenAddingBook(
      "Преступление и наказание1",
      " О жизни бедного студента решившегося на убийство",
      "Достоевский Ф.М."
    );
    cy.contains("Favorites").click(); // заходим в Избранное
    cy.contains("Delete from favorite").click(); // удаляем книгу
  });
});
