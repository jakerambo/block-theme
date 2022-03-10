<?php
/**
 * Enqueues theme specific JavaScript and CSS files
 *
 * @package Block Theme Starter
 * @since   1.0.0
 */

/**
 * Enqueue
 *
 * @package Block Theme Starter
 * @since   1.0.0
 */
class Enqueue {

	/**
	 * Constructor
	 */
	public function __construct() {
		add_action( 'wp_enqueue_scripts', array( $this, 'enqueue_scripts' ) );
		add_action( 'wp_enqueue_styles', array( $this, 'enqueue_styles' ) );
	}

	/**
	 * Get File Modified Date.
	 *
	 * @param  string $file_path the path to file.
	 * @return timestamp            the time modified.
	 */
	public function modified_date( $file_path ) {

		// Verify the file exists before returning the UNIX timestamp.
		if ( ! file_exists( $file_path ) ) {
			return;
		}

		// Return UNIX timestamp of the file.
		return filemtime( $file_path );
	}

	/**
	 * Enqueue Javascript files.
	 */
	public function enqueue_scripts() {
		// Ensure that the block editor scripts don't load on the frontend.
		wp_deregister_script( 'wp-blocks' );
		wp_dequeue_script( 'wp-blocks' );

		// Don't load jQuery.
		wp_deregister_script( 'jquery' );
		wp_dequeue_script( 'jquery' );

		// Main JavaScript file.
		wp_enqueue_script( 'block-theme-starter-js', get_template_directory_uri() . '/js/main.js', array(), $this->modified_date( get_stylesheet_directory() . '/js/main.js' ), true );

		// Localized variables for use within JavaScript.
		$local_params = array(
			'siteUrl'   => get_site_url(),
			'themeUrl'  => get_template_directory_uri(),
			'restUrl'   => get_rest_url( null, '/em/v1/' ),
		);

		wp_localize_script( 'block-theme-starter-js', 'themeJsData', $local_params );

		// If comments are enabled, output the WordPress comment-reply script.
		if ( is_singular() && comments_open() && get_option( 'thread_comments' ) ) {
			wp_enqueue_script( 'comment-reply' );
		}
	}

	/**
	 * Enqueue Stylesheets.
	 */
	public function enqueue_styles() {
		// Main css file.
		wp_enqueue_style( 'block-theme-starter-css', get_template_directory_uri() . '/css/main.css', array( 'google-fonts-css' ), $this->modified_date( get_stylesheet_directory() . '/css/main.css' ) );
	}
}

new Enqueue();
