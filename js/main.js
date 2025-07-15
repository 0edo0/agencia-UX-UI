// Espera a que todo el contenido de la página se cargue antes de ejecutar el script
document.addEventListener('DOMContentLoaded', function() {

    /**
     * FUNCIONALIDAD 1: Mensaje de éxito para el formulario de contacto.
     * Muestra una ventana modal con un diseño limpio cuando el usuario envía el formulario.
     */
    function handleContactForm() {
        const contactForm = document.querySelector('.contact-page form');

        // Si no estamos en la página de contacto, no hace nada.
        if (!contactForm) {
            return;
        }

        contactForm.addEventListener('submit', function(event) {
            // Previene el comportamiento por defecto del formulario (que es recargar la página).
            event.preventDefault();

            // Muestra nuestra ventana modal personalizada.
            showSuccessModal();

            // Limpia los campos del formulario después de enviarlo.
            contactForm.reset();
        });
    }

    function showSuccessModal() {
        // Crea el HTML de la ventana modal dinámicamente.
        // No necesitas añadir esto a tu HTML, el script lo hace por ti.
        const modalHTML = `
            <div class="modal fade" id="successModal" tabindex="-1" aria-labelledby="successModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content" style="background-color: #1a1a1a; color: #fff; border-radius: 1rem; border: 1px solid #333;">
                        <div class="modal-body text-center py-5">
                            <div class="mb-3">
                                <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" fill="#4CAF50" class="bi bi-check-circle-fill" viewBox="0 0 16 16">
                                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
                                </svg>
                            </div>
                            <h5 class="modal-title mb-2" id="successModalLabel" style="font-size: 1.5rem;">¡Mensaje Enviado!</h5>
                            <p style="color: #ccc;">Gracias por contactarnos. Te responderemos a la brevedad.</p>
                            <button type="button" class="btn btn-purple mt-3" data-bs-dismiss="modal">Cerrar</button>
                        </div>
                    </div>
                </div>
            </div>
        `;

        // Añade el HTML al final del body y muestra la ventana.
        document.body.insertAdjacentHTML('beforeend', modalHTML);
        const modalElement = document.getElementById('successModal');
        const bootstrapModal = new bootstrap.Modal(modalElement);
        bootstrapModal.show();

        // IMPORTANTE: Elimina la ventana del DOM después de que se oculte para mantener el HTML limpio.
        modalElement.addEventListener('hidden.bs.modal', function () {
            modalElement.remove();
        });
    }


    /**
     * FUNCIONALIDAD 2: Animación sutil al hacer scroll.
     * Las tarjetas de proyectos y equipo aparecerán con un suave efecto de "fade-in".
     */
    function animateOnScroll() {
        const elementsToAnimate = document.querySelectorAll('.project-card, .team-card');

        if (elementsToAnimate.length === 0) {
            return;
        }

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                // Cuando el elemento es visible en la pantalla...
                if (entry.isIntersecting) {
                    // ...le añadimos la clase 'is-visible' para que la animación CSS se active.
                    entry.target.classList.add('is-visible');
                    // Dejamos de observar el elemento para mejorar el rendimiento.
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1 // La animación se dispara cuando el 10% del elemento es visible.
        });

        // Hacemos que el observador vigile cada uno de los elementos.
        elementsToAnimate.forEach(el => {
            observer.observe(el);
        });
    }

    /**
     * FUNCIONALIDAD 3: Resaltar el enlace de la página activa en el menú de navegación.
     * El enlace correspondiente a la página actual (Nosotros, Proyectos, etc.) se verá diferente.
     */
    function highlightActiveNav() {
        // Obtiene el nombre del archivo de la página actual (ej. "proyectos.html")
        const currentPage = window.location.pathname.split('/').pop();
        const navLinks = document.querySelectorAll('.navbar-nav .nav-link');

        navLinks.forEach(link => {
            if (link.getAttribute('href') === currentPage) {
                link.style.color = '#f39c12'; // Color naranja/amarillo
                link.style.fontWeight = 'bold';
            }
        });
    }

    // --- Llamamos a todas nuestras funciones ---
    handleContactForm();
    animateOnScroll();
    highlightActiveNav();

});