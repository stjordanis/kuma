(function() {
    'use strict';

    if (!window.mdn) {
        window.mdn = {};
    }

    /**
     * A modal dialog implemetation based on:
     * https://www.w3.org/TR/wai-aria-practices-1.1/#dialog_modal
     */
    var modalDialog = {
        /**
         * Returns `false` if either of the following conditions are true else, returns `true`:
         * 1. Multi auth is not turned on
         * 2. The modal we expect is not present
         * 3. We are on a mobile phone
         * @param {Object} modal - The modal as an `HTMLElement`
         * @returns {Boolean}
         */
        showModal: function (modal) {
            if (
                !window.mdn.multiAuthEnabled ||
                !modal ||
                (window.matchMedia &&
                    window.matchMedia('(max-width:47.9385em)').matches)
            ) {
                return false;
            } else {
                return true;
            }
        },
        /**
         * Closes the modal and resets focus to the `activeElement`
         * which had focus before the modal was opened.
         * @param {Object} modal - The modal HTMLElement
         * @param {Object} modalTrigger - The element that triggered the modal
         */
        closeModal: function(modal, modalTrigger) {
            modal.classList.add('hidden');
            modalTrigger.focus();
        },
        /**
         * Handles the following keyboard events:
         * 1. `Tab` and `Shift+Tab` events to ensure keyboard focus is
         * trapped inside the modal and that focus moves through
         * the modal as expected
         * 2. Closes the modal when the `Escape` key is pressed
         * @param {Object} modal - The modal HTMLElement
         * @param {Object} modalTrigger - The element that triggered the modal
         */
        handleKeyboardEvents: function(modal, modalTrigger) {
            var firstFocusable = document.querySelector(
                '[data-first-focusable]'
            );
            var lastFocusable = document.querySelector('[data-last-focusable]');

            // ensure that keyboard focus is trapped inside the modal
            modal.addEventListener('keydown', function(event) {
                if (
                    !event.shiftKey &&
                    event.key === 'Tab' &&
                    event.target === lastFocusable
                ) {
                    event.preventDefault();
                    firstFocusable.focus();
                }

                if (
                    event.shiftKey &&
                    event.key === 'Tab' &&
                    event.target === firstFocusable
                ) {
                    event.preventDefault();
                    lastFocusable.focus();
                }
            });

            modal.addEventListener('keyup', function(event) {
                if (event.key === 'Escape') {
                    modalDialog.closeModal(modal, modalTrigger);
                }
            });
        }
    };

    window.mdn.modalDialog = modalDialog;
})();
