class Card {
  constructor(id) {
    this.id = id;
    this.html = `<div class="card">
        <div class="card-back -open">
          <div class="card-back--icon ${this.id}"></div>
        </div>
        <div class="card-front">
          <div style="background-image: url('images/${this.id}.png')" class="card-front--icon"></div>
        </div>
      </div>`;
  }
}
