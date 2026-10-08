class PaginationEngine {
  constructor(items = [], itemsPerPage = 10) {
    this.items = items;
    this.itemsPerPage = itemsPerPage;
  }

  setItems(items) {
    this.items = items;
  }

  getTotalPages() {
    return Math.ceil(this.items.length / this.itemsPerPage);
  }

  getPage(page) {
    const start = (page - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;

    return this.items.slice(start, end);
  }

  hasNextPage(page) {
    return page < this.getTotalPages();
  }

  hasPreviousPage(page) {
    return page > 1;
  }
}

export default PaginationEngine;