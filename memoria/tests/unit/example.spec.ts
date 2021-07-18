import MemoryGame from '../../../memoria/src/modules/MemoryGame'

let specs = () => {
  const letters = [{ letter: "A" }, { letter: "B" }, { letter: "C" }];
  const letterPredicate = (item) => item.letter;
  const getIndexesByKey = (list, search) => {
    return list.reduce((total, current, index) => {
      current.$key === search && total.push(index);
      return total;
    }, []);
  };

  it("1 - MemoryGames does exist", () => {
    expect(MemoryGame).not.toBeUndefined();
  });

  it("2 - Cards change state when flipped", () => {
    const memoryGame = new MemoryGame(letters, letterPredicate);
    memoryGame.flip(2);
    expect(memoryGame.board[2].state).toBe("flipped");
    memoryGame.flip(2);
    expect(memoryGame.board[2].state).toBe("initial");
  });

  it("3 - Only two cards can be flipped at same time", () => {
    const memoryGame = new MemoryGame(letters, letterPredicate);
    memoryGame.flip(1);
    memoryGame.flip(2);
    memoryGame.flip(3);
    memoryGame.flip(4);
    const flipped = memoryGame.board.filter(
      (card) => card.state === "flipped"
    );
    expect(flipped.length).toBeLessThan(3);
  });

  it("4 - Can't flip matched cards", () => {
    const memoryGame = new MemoryGame(letters, letterPredicate);
    const [A1, A2] = getIndexesByKey(memoryGame.board, "A");
    memoryGame.flip(A1);
    expect(memoryGame.board[A1].state).toBe("flipped");
    memoryGame.flip(A2);
    expect(memoryGame.board[A1].state).toBe("match");
    expect(memoryGame.board[A2].state).toBe("match");
    memoryGame.flip(A1);
    expect(memoryGame.board[A1].state).toBe("match");
    memoryGame.flip(A2);
    expect(memoryGame.board[A2].state).toBe("match");
  });

  it("5 - Finish game when all cards are match", () => {
    const memoryGame = new MemoryGame(letters, letterPredicate);
    const [A1, A2] = getIndexesByKey(memoryGame.board, "A");
    const [B1, B2] = getIndexesByKey(memoryGame.board, "B");
    const [C1, C2] = getIndexesByKey(memoryGame.board, "C");
    expect(memoryGame.isFinished).toBe(false);
    memoryGame.flip(B1);
    memoryGame.flip(B1);
    memoryGame.flip(B1);
    expect(memoryGame.isFinished).toBe(false);
    memoryGame.flip(B2);
    expect(memoryGame.isFinished).toBe(false);
    memoryGame.flip(A1);
    expect(memoryGame.isFinished).toBe(false);
    memoryGame.flip(A2);
    expect(memoryGame.isFinished).toBe(false);
    memoryGame.flip(C1);
    expect(memoryGame.isFinished).toBe(false);
    memoryGame.flip(C2);
    expect(memoryGame.isFinished).toBe(true);
  });

  it("6 - More complex game spec", () => {
    const memoryGame = new MemoryGame(letters, letterPredicate);
    const [A1, A2] = getIndexesByKey(memoryGame.board, "A");
    const [B1, B2] = getIndexesByKey(memoryGame.board, "B");
    const [C1, C2] = getIndexesByKey(memoryGame.board, "C");
    expect(memoryGame.isFinished).toBe(false);
    memoryGame.flip(A1);
    expect(memoryGame.board[A1].state).toBe("flipped");
    memoryGame.flip(B2); // wrong move
    expect(memoryGame.board[A1].state).toBe("initial");
    memoryGame.flip(A1);
    expect(memoryGame.board[A1].state).toBe("flipped");
    memoryGame.flip(A2); // right move
    expect(memoryGame.board[A1].state).toBe("match");
    expect(memoryGame.board[A2].state).toBe("match");
    memoryGame.flip(C2);
    expect(memoryGame.board[C2].state).toBe("flipped");
    memoryGame.flip(C2);
    expect(memoryGame.board[C2].state).toBe("initial");
    memoryGame.flip(C2);
    memoryGame.flip(B2);
    expect(memoryGame.board[B2].state).toBe("initial");
    expect(memoryGame.board[C2].state).toBe("initial");
    memoryGame.flip(C2);
    memoryGame.flip(C1);
    expect(memoryGame.board[C1].state).toBe("match");
    expect(memoryGame.board[C2].state).toBe("match");
    expect(memoryGame.isFinished).toBe(false);
    memoryGame.flip(B2);
    memoryGame.flip(A2);
    memoryGame.flip(B1);
    expect(memoryGame.board[B1].state).toBe("match");
    expect(memoryGame.board[B2].state).toBe("match");
    expect(memoryGame.isFinished).toBe(true);
  });

  it("7 - May not use predicate", () => {
    const memoryGame = new MemoryGame([{name: "GitHub"}, {name: "CodePen"}, {name: "GitLab"}]);
    expect(memoryGame.board.length).toBe(6);
    expect(memoryGame.board.filter(item => item.name === "GitHub").length).toBe(2);
    expect(memoryGame.board.filter(item => item.name === "CodePen").length).toBe(2);
    expect(memoryGame.board.filter(item => item.name === "GitLab").length).toBe(2);
    expect(memoryGame.board.filter(item => item.$key === "0").length).toBe(2);
    expect(memoryGame.board.filter(item => item.$key === "1").length).toBe(2);
    expect(memoryGame.board.filter(item => item.$key === "2").length).toBe(2);
  });
};

describe("Memory card game specs", specs);
let specs = () => {
  const letters = [{ letter: "A" }, { letter: "B" }, { letter: "C" }];
  const letterPredicate = (item) => item.letter;
  const getIndexesByKey = (list, search) => {
    return list.reduce((total, current, index) => {
      current.$key === search && total.push(index);
      return total;
    }, []);
  };

  it("1 - MemoryGames does exist", () => {
    expect(MemoryGame).not.toBeUndefined();
  });

  it("2 - Cards change state when flipped", () => {
    const memoryGame = new MemoryGame(letters, letterPredicate);
    memoryGame.flip(2);
    expect(memoryGame.board[2].state).toBe("flipped");
    memoryGame.flip(2);
    expect(memoryGame.board[2].state).toBe("initial");
  });

  it("3 - Only two cards can be flipped at same time", () => {
    const memoryGame = new MemoryGame(letters, letterPredicate);
    memoryGame.flip(1);
    memoryGame.flip(2);
    memoryGame.flip(3);
    memoryGame.flip(4);
    const flipped = memoryGame.board.filter(
      (card) => card.state === "flipped"
    );
    expect(flipped.length).toBeLessThan(3);
  });

  it("4 - Can't flip matched cards", () => {
    const memoryGame = new MemoryGame(letters, letterPredicate);
    const [A1, A2] = getIndexesByKey(memoryGame.board, "A");
    memoryGame.flip(A1);
    expect(memoryGame.board[A1].state).toBe("flipped");
    memoryGame.flip(A2);
    expect(memoryGame.board[A1].state).toBe("match");
    expect(memoryGame.board[A2].state).toBe("match");
    memoryGame.flip(A1);
    expect(memoryGame.board[A1].state).toBe("match");
    memoryGame.flip(A2);
    expect(memoryGame.board[A2].state).toBe("match");
  });

  it("5 - Finish game when all cards are match", () => {
    const memoryGame = new MemoryGame(letters, letterPredicate);
    const [A1, A2] = getIndexesByKey(memoryGame.board, "A");
    const [B1, B2] = getIndexesByKey(memoryGame.board, "B");
    const [C1, C2] = getIndexesByKey(memoryGame.board, "C");
    expect(memoryGame.isFinished).toBe(false);
    memoryGame.flip(B1);
    memoryGame.flip(B1);
    memoryGame.flip(B1);
    expect(memoryGame.isFinished).toBe(false);
    memoryGame.flip(B2);
    expect(memoryGame.isFinished).toBe(false);
    memoryGame.flip(A1);
    expect(memoryGame.isFinished).toBe(false);
    memoryGame.flip(A2);
    expect(memoryGame.isFinished).toBe(false);
    memoryGame.flip(C1);
    expect(memoryGame.isFinished).toBe(false);
    memoryGame.flip(C2);
    expect(memoryGame.isFinished).toBe(true);
  });

  it("6 - More complex game spec", () => {
    const memoryGame = new MemoryGame(letters, letterPredicate);
    const [A1, A2] = getIndexesByKey(memoryGame.board, "A");
    const [B1, B2] = getIndexesByKey(memoryGame.board, "B");
    const [C1, C2] = getIndexesByKey(memoryGame.board, "C");
    expect(memoryGame.isFinished).toBe(false);
    memoryGame.flip(A1);
    expect(memoryGame.board[A1].state).toBe("flipped");
    memoryGame.flip(B2); // wrong move
    expect(memoryGame.board[A1].state).toBe("initial");
    memoryGame.flip(A1);
    expect(memoryGame.board[A1].state).toBe("flipped");
    memoryGame.flip(A2); // right move
    expect(memoryGame.board[A1].state).toBe("match");
    expect(memoryGame.board[A2].state).toBe("match");
    memoryGame.flip(C2);
    expect(memoryGame.board[C2].state).toBe("flipped");
    memoryGame.flip(C2);
    expect(memoryGame.board[C2].state).toBe("initial");
    memoryGame.flip(C2);
    memoryGame.flip(B2);
    expect(memoryGame.board[B2].state).toBe("initial");
    expect(memoryGame.board[C2].state).toBe("initial");
    memoryGame.flip(C2);
    memoryGame.flip(C1);
    expect(memoryGame.board[C1].state).toBe("match");
    expect(memoryGame.board[C2].state).toBe("match");
    expect(memoryGame.isFinished).toBe(false);
    memoryGame.flip(B2);
    memoryGame.flip(A2);
    memoryGame.flip(B1);
    expect(memoryGame.board[B1].state).toBe("match");
    expect(memoryGame.board[B2].state).toBe("match");
    expect(memoryGame.isFinished).toBe(true);
  });

  it("7 - May not use predicate", () => {
    const memoryGame = new MemoryGame([{name: "GitHub"}, {name: "CodePen"}, {name: "GitLab"}]);
    expect(memoryGame.board.length).toBe(6);
    expect(memoryGame.board.filter(item => item.name === "GitHub").length).toBe(2);
    expect(memoryGame.board.filter(item => item.name === "CodePen").length).toBe(2);
    expect(memoryGame.board.filter(item => item.name === "GitLab").length).toBe(2);
    expect(memoryGame.board.filter(item => item.$key === "0").length).toBe(2);
    expect(memoryGame.board.filter(item => item.$key === "1").length).toBe(2);
    expect(memoryGame.board.filter(item => item.$key === "2").length).toBe(2);
  });
};

describe("Memory card game specs", specs);
