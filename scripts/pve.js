$(document).ready(function () {
	const choiceModal = $('#choiceModal');
	const choiceButton = $('.choice');
	const gameOver = $('#gameOverScreen');
	const cells = Array.from($('.cell'));
	let currPlayer = {
		symbol: null,
		type: 'player',
	};
	const grid = [null, null, null, null, null, null, null, null, null];

	const checkForWin = (gridArr) => {
		const winningCombinations = [
			['X', 'X', 'X'],
			['O', 'O', 'O'],
		];
		for (const combination of winningCombinations) {
			if (
				grid[0] === combination[0] &&
				grid[1] === combination[1] &&
				grid[2] === combination[2]
			) {
				$(cells[0]).addClass('winner');
				$(cells[1]).addClass('winner');
				$(cells[2]).addClass('winner');
				return combination[0];
			}
			if (
				grid[3] === combination[0] &&
				grid[4] === combination[1] &&
				grid[5] === combination[2]
			) {
				$(cells[3]).addClass('winner');
				$(cells[4]).addClass('winner');
				$(cells[5]).addClass('winner');
				return combination[0];
			}
			if (
				grid[6] === combination[0] &&
				grid[7] === combination[1] &&
				grid[8] === combination[2]
			) {
				$(cells[6]).addClass('winner');
				$(cells[7]).addClass('winner');
				$(cells[8]).addClass('winner');
				return combination[0];
			}
			if (
				grid[0] === combination[0] &&
				grid[3] === combination[1] &&
				grid[6] === combination[2]
			) {
				$(cells[0]).addClass('winner');
				$(cells[3]).addClass('winner');
				$(cells[6]).addClass('winner');
				return combination[0];
			}
			if (
				grid[1] === combination[0] &&
				grid[4] === combination[1] &&
				grid[7] === combination[2]
			) {
				$(cells[1]).addClass('winner');
				$(cells[4]).addClass('winner');
				$(cells[7]).addClass('winner');
				return combination[0];
			}
			if (
				grid[2] === combination[0] &&
				grid[5] === combination[1] &&
				grid[8] === combination[2]
			) {
				$(cells[2]).addClass('winner');
				$(cells[5]).addClass('winner');
				$(cells[8]).addClass('winner');
				return combination[0];
			}
			if (
				grid[0] === combination[0] &&
				grid[4] === combination[1] &&
				grid[8] === combination[2]
			) {
				$(cells[0]).addClass('winner');
				$(cells[4]).addClass('winner');
				$(cells[8]).addClass('winner');
				return combination[0];
			}
			if (
				grid[2] === combination[0] &&
				grid[4] === combination[1] &&
				grid[6] === combination[2]
			) {
				$(cells[2]).addClass('winner');
				$(cells[4]).addClass('winner');
				$(cells[6]).addClass('winner');
				return combination[0];
			}
		}
		return null;
	};

	const togglePlayer = () => {
		$('.playerX').toggleClass('active');
		$('.playerO').toggleClass('active');
		$('#sliderToggler').toggleClass('active');
		currPlayer.symbol = currPlayer.symbol == 'X' ? 'O' : 'X';
		currPlayer.type = currPlayer.type == 'player' ? 'AI' : 'player';
	};

	const chooseAIMove = (grid, symbol) => {
		const opponentSymbol = symbol === 'X' ? 'O' : 'X';

		for (let i = 0; i < grid.length; i++) {
			if (grid[i] === null) {
				const newGrid = [...grid];
				newGrid[i] = symbol;
				if (checkForWin(newGrid) === symbol) {
					return i;
				}
			}
		}

		for (let i = 0; i < grid.length; i++) {
			if (grid[i] === null) {
				const newGrid = [...grid];
				newGrid[i] = opponentSymbol;
				if (checkForWin(newGrid) === opponentSymbol) {
					return i;
				}
			}
		}

		for (let i = 0; i < grid.length; i++) {
			if (grid[i] === null) {
				return i;
			}
		}
	};

	const runAIMove = () => {
		if (currPlayer.type == 'AI') {
			const move = chooseAIMove(grid, currPlayer.symbol);
			cells[move].textContent = currPlayer.symbol;
			grid[move] = currPlayer.symbol;

			const winner = checkForWin(grid);
			if (winner) {
				setTimeout(() => {
					$('#gameOverScreen #endSplash').html(
						`Player ${winner} is the winner!`
					);
					$(gameOver).modal('show');
				}, 1000);
				$('#playBoard').addClass('disableClick');
			}
			if (grid.every((cell) => cell !== null)) {
				setTimeout(() => {
					$('#gameOverScreen #endSplash').html("It's A draw");
					$(gameOver).modal('show');
				}, 1000);
				$('#playBoard').addClass('disableClick');
			}
			togglePlayer();
		}
	}

	const clickHandler = (el) => {
		if (currPlayer.type == 'player') {
			const cell = el.target;
			const cell_idx = $(cell).attr('data-index');
			if (grid[cell_idx] !== null) return;

			grid[cell_idx] = currPlayer.symbol;
			let cellClass =
				currPlayer.symbol === 'X' ? 'text-primary' : 'text-secondary';
			$(cell).text(currPlayer.symbol);
			$(cell).addClass(cellClass);

			const winner = checkForWin(grid);
			if (winner) {
				setTimeout(() => {
					$('#gameOverScreen #endSplash').html(`Player ${winner} is the winner!`);
					$(gameOver).modal('show');
				}, 1000);
				$('#playBoard').addClass('disableClick');
				return
			}
			if (grid.every((cell) => cell !== null)) {
				setTimeout(() => {
					$('#gameOverScreen #endSplash').html("It's A draw");
					$(gameOver).modal('show');
				}, 1000);
				$('#playBoard').addClass('disableClick');
				return
			}
			togglePlayer();
		}
		setInterval(runAIMove, 300);

	};

	cells.forEach((el) => {
		$(el).click(clickHandler);
	});

	$(choiceModal).modal('show');

	Array.from(choiceButton).forEach((el) => {
		$(el).click(function (e) {
			currPlayer.symbol = $(e.target).attr('data-value');
			$(choiceModal).modal('hide');
			setTimeout(() => {
				if(currPlayer.symbol != 'X'){
					togglePlayer();
					runAIMove();
				}
			}, 500)
		});
	});
});