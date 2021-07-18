interface CardInterface {
  $key: string;
  state: 'initial' | 'flipped' | 'match';
}

class MemoryGame {
  isFinished: boolean;

  board: CardInterface[];

  private matches: number;

  constructor(items: Array, keyPredicate: Function = (item, index) => index.toString()) { // eslint-disable-line
    this.isFinished = false;
    this.board = this.mount(items, keyPredicate);
    this.matches = 0;
  }

  private shuffleList(original: Array): Array { // eslint-disable-line
    // referente https://dev.to/codebubb/how-to-shuffle-an-array-in-javascript-2ikj
    const list = JSON.parse(JSON.stringify(original));

    for (let i = list.length - 1; i > 0; i--) { // eslint-disable-line
      const j = Math.floor(Math.random() * (i + 1));
      const temp = list[i];
      list[i] = list[j];
      list[j] = temp;
    }
    return list;
  }

  private mount(items: Array, keyPredicate: Function): CardInterface[] { // eslint-disable-line
    const mapped = items.map((item, index) => ({
      $key: keyPredicate(item, index),
      state: 'initial',
      ...item,
    }));
    return this.shuffleList([...mapped, ...mapped]);
  }

  flip(index: number): void {
    const hasFlippedMatch = this.board[index].state === 'match';
    const lastFlippedIndex = this.board.findIndex(
      (card) => card.state === 'flipped',
    );
    const lastFlippedCard = this.board[lastFlippedIndex] || null;
    const hasRepeteadFlip = index === lastFlippedIndex;
    const noop = (): void => {}; // eslint-disable-line

    const moves = [
      {
        condition:
          hasFlippedMatch || typeof this.board[index] === 'undefined',
        do: noop,
      },
      {
        condition:
          hasRepeteadFlip === false
          && lastFlippedCard
          && lastFlippedCard.$key === this.board[index].$key,
        do: () => {
          this.board[lastFlippedIndex].state = 'match';
          this.board[index].state = 'match';
          this.matches++; // eslint-disable-line
          this.isFinished = this.matches === this.board.length / 2;
        },
      },
      {
        condition:
          hasRepeteadFlip === false
          && lastFlippedCard
          && lastFlippedCard.$key !== this.board[index].$key,
        do: () => {
          this.board[lastFlippedIndex].state = 'initial';
          this.board[index].state = 'initial';
        },
      },
      {
        condition: hasRepeteadFlip,
        do: () => {
          this.board[index].state = 'initial';
        },
      },
      {
        condition: hasRepeteadFlip === false,
        do: () => {
          this.board[index].state = 'flipped';
        },
      },
    ];

    moves.find((move) => move.condition).do();
  }
}

export default MemoryGame;
