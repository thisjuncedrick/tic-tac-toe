$(document).ready(function() {
	// Confetti Particle
	particlesJS.load('confettiBG', 'particle-app.json');

	const refresh = $('.refresh');
	Array.from(refresh).forEach(el => {
		$(el).click(function(e) {
			e.preventDefault();
			location.reload();
		});
	});
});