$(document).ready(function() {
	const cells = Array.from($('.cell'));
	const gameOver = $('#gameOverScreen');
	let currPlayer = 'X';
	const grid = [null, null, null, null, null, null, null, null, null];

	const checkForWin = (gridArr) => {
		const winningCombinations = [
			[0, 1, 2],
			[3, 4, 5],
			[6, 7, 8],
			[0, 3, 6],
			[1, 4, 7],
			[2, 5, 8],
			[0, 4, 8],
			[2, 4, 6],
		];

		for (const i of winningCombinations) {
			const [a, b, c] = i;
			if (
				gridArr[a] === gridArr[b] &&
				gridArr[a] === gridArr[c] &&
				gridArr[a] !== null
			) {
				$(cells[a]).addClass('winner');
				$(cells[b]).addClass('winner');
				$(cells[c]).addClass('winner');
				return grid[a];
			}
		}
		return null;
	};

	const togglePlayer = () => {
		$('.playerX').toggleClass('active');
		$('.playerO').toggleClass('active');
		$('#sliderToggler').toggleClass('active');
		currPlayer = currPlayer === 'X' ? 'O' : 'X';
	};

	const clickHandler = (el) => {
		const cell = el.target;
		const cell_idx = $(cell).attr('data-index');

		if (grid[cell_idx] !== null) return;
		grid[cell_idx] = currPlayer;
		let cellClass = currPlayer === 'X' ? 'text-primary' : 'text-secondary';
		$(cell).text(currPlayer);
		$(cell).addClass(cellClass);

		const winner = checkForWin(grid);
		if (winner) {
			setTimeout(() => {
				$('#gameOverScreen #endSplash').html(`Player ${winner} is the winner!`);
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
	};

	cells.forEach((el) => {
		$(el).click(clickHandler);
	});
});