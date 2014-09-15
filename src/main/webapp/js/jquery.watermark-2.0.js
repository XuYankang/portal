/*	
	Watermark plugin for jQuery
	Version: 2.0

	Copyright (c) 2009 Todd Northrop
	http://www.speednet.biz/
	
	June 2, 2009

	Requires:  jQuery 1.2.3+
	
	This program is free software: you can redistribute it and/or modify
	it under the terms of the GNU General Public License as published by
	the Free Software Foundation, either version 3 of the License, or
	(at your option) any later version, subject to the following conditions:
	
	The above copyright notice and this permission notice shall be
	included in all copies or substantial portions of the Software.
	
	This program is distributed in the hope that it will be useful,
	but WITHOUT ANY WARRANTY; without even the implied warranty of
	MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
	GNU General Public License for more details.

	You should have received a copy of the GNU General Public License
	along with this program.  If not, see <http://www.gnu.org/licenses/>.
------------------------------------------------------*/

(function ($) {

//var
	// Will speed up references to undefined
	undefined,

	// String constants for data names
	dataFlag = "watermark",
	dataClass = "watermarkClass",
	dataFocus = "watermarkFocus",
	dataFormSubmit = "watermarkSubmit",
	dataMaxLen = "watermarkMaxLength",
	dataPassword = "watermarkPassword",
	dataText = "watermarkText",
	
	// Includes only elements with watermark defined
	selWatermarkDefined = ":data(" + dataFlag + ")",

	// Includes only elements capable of having watermark
	selWatermarkAble = ":text,:password,textarea";

// Extends jQuery with a custom selector - ":data(...)"
// :data(<name>)  Includes elements that have a specific name defined in the jQuery data collection. (Only the existence of the name is checked; the value is ignored.)
// :data(<name>=<value>)  Includes elements that have a specific jQuery data name defined, with a specific value associated with it.
// :data(<name>!=<value>)  Includes elements that have a specific jQuery data name defined, with a value that is not equal to the value specified.
// :data(<name>^=<value>)  Includes elements that have a specific jQuery data name defined, with a value that starts with the value specified.
// :data(<name>$=<value>)  Includes elements that have a specific jQuery data name defined, with a value that ends with the value specified.
// :data(<name>*=<value>)  Includes elements that have a specific jQuery data name defined, with a value that contains the value specified.
$.extend($.expr[":"], {
	"data": function (element, index, matches, set) {
		var data, parts = /^((?:[^=!^$*]|[!^$*](?!=))+)(?:([!^$*]?=)(.*))?$/.exec(matches[3]);
		if (parts) {
			data = $(element).data(parts[1]);
			
			if (data !== undefined) {

				if (parts[2]) {
					data = "" + data;
				
					switch (parts[2]) {
						case "=":
							return (data == parts[3]);
						case "!=":
							return (data != parts[3]);
						case "^=":
							return (data.slice(0, parts[3].length) == parts[3]);
						case "$=":
							return (data.slice(-parts[3].length) == parts[3]);
						case "*=":
							return (data.indexOf(parts[3]) !== -1);
					}
				}

				return true;
			}
		}
		
		return false;
	}
});

$.watermark = {

	// Default class name for all watermarks
	className: "watermark",
	
	// Hide one or more watermarks by specifying any selector type
	// i.e., DOM element, string selector, jQuery matched set, etc.
	hide: function (selector) {
		$(selector).filter(selWatermarkDefined).each(
			function () {
				$.watermark._hide($(this));
			}
		);
	},

	// Internal use only.
	_hide: function ($input, focus) {
	
		if ($input.val() == $input.data(dataText)) {
			$input.val("");
			
			// Password type?
			if ($input.data(dataPassword)) {
				
				if ($input.attr("type") === "text") {
					var $pwd = $input.data(dataPassword), $wrap = $input.parent();
					$wrap[0].removeChild($input[0]); // Can't use jQuery methods, because they destroy data
					$wrap[0].appendChild($pwd[0]);
					$input = $pwd;
				}
			}
			
			if ($input.data(dataMaxLen)) {
				$input.attr("maxLength", $input.data(dataMaxLen));
				$input.removeData(dataMaxLen);
			}
		
			if (focus) {
				$input.attr("autocomplete", "off");  // Avoid NS_ERROR_XPC_JS_THREW_STRING error in Firefox
				window.setTimeout(
					function () {
						$input.select();  // Fix missing cursor in IE
					}
				, 0);
			}
		}
		
		$input.removeClass($input.data(dataClass));
	},
	
	// Display one or more watermarks by specifying any selector type
	// i.e., DOM element, string selector, jQuery matched set, etc.
	// If conditions are not right for displaying a watermark, ensures that watermark is not shown.
	show: function (selector) {
		$(selector).filter(selWatermarkDefined).each(
			function () {
				$.watermark._show($(this));
			}
		);
	},
	
	// Internal use only.
	_show: function ($input) {
		var val = $input.val(), text = $input.data(dataText);

		if (((val.length == 0) || (val == text)) && (!$input.data(dataFocus))) {
		
			// Password type?
			if ($input.data(dataPassword)) {
				
				if ($input.attr("type") === "password") {
					var $wm = $input.data(dataPassword), $wrap = $input.parent();
					$wrap[0].removeChild($input[0]); // Can't use jQuery methods, because they destroy data
					$wrap[0].appendChild($wm[0]);
					$input = $wm;
				}
			}
		
			// Ensure maxLength big enough to hold watermark (input of type="text" only)
			if ($input.attr("type") === "text") {
				var maxLen = $input.attr("maxLength");
				
				if ((maxLen > 0) && (text.length > maxLen)) {
					$input.data(dataMaxLen, maxLen);
					$input.attr("maxLength", text.length);
				}
			}
            
			$input.val(text);
			$input.addClass($input.data(dataClass));
		}
		else {
			$.watermark._hide($input);
		}
	},
	
	// Hides all watermarks on the current page.
	hideAll: function () {
		$.watermark.hide(selWatermarkAble);
	},
	
	// Displays all watermarks on the current page.
	showAll: function () {
		$.watermark.show(selWatermarkAble);
	}
};

$.fn.watermark = function (text, className) {
	///	<summary>
	///		Set watermark text and class name on all input elements of type="text" and textareas within
	/// 	the matched set. If className is not included, the default is "watermark". Within the matched
	/// 	set, only input elements with type="text" and textareas are affected; all other elements are
	/// 	ignored.
	///	</summary>
	///	<returns type="jQuery">
	///		Returns the original jQuery matched set (not just the input and texarea elements).
	/// </returns>
	///	<param name="text" type="String">
	///		Text to display as a watermark when the input or textarea element has an empty value and does not
	/// 	have focus. The first time watermark() is called on an element, if this argument is empty (or not
	/// 	a String type), then the watermark will have the net effect of only changing the class name when
	/// 	the input or textarea element's value is empty and it does not have focus.
	///	</param>
	///	<param name="className" type="String" optional="true">
	///		Provides the ability to override the default class name of "watermark" with the supplied class name.
	///	</param>
	/// <remarks>
	///		The effect of changing the text and class name on an input element is called a watermark because
	///		typically light gray text is used to provide a hint as to what type of input is required. However,
	///		the appearance of the watermark can be something completely different: simply change the CSS style
	///		pertaining to the supplied class name.
	///		
	///		The first time watermark() is called on an element, the watermark text and class name are initialized,
	///		and the focus and blur events are hooked in order to control the display of the watermark.
	///		
	///		Subsequently, watermark() can be called again on an element in order to change the watermark text
	///		and/or class name, and it can also be called without any arguments in order to refresh the display.
	///		
	///		For example, after changing the value of the input or textarea element programmatically, watermark()
	/// 	should be called without any arguments to refresh the display, because the change event is only
	/// 	triggered by user actions, not by programmatic changes to an input or textarea element's value.
	/// 	
	/// 	The one exception to programmatic updates is for password input elements:  you are strongly cautioned
	/// 	against changing the value of a password input element programmatically (after the page loads).
	/// 	The reason is that some fairly hairy code is required behind the scenes to make the watermarks bypass
	/// 	IE security and switch back and forth between clear text (for watermarks) and obscured text (for
	/// 	passwords).  It is *possible* to make programmatic changes, but it must be done in a certain way, and
	/// 	overall it is not recommended.
	/// </remarks>
	
	var hasText = (typeof(text) === "string"), hasClass = (typeof(className) === "string");

	return this.filter(selWatermarkAble).each(
		function () {
			var $input = $(this);
			
			// Watermark already initialized?
			if ($input.data(dataFlag)) {
			
				// If re-defining text or class, first remove existing watermark, then make changes
				if (hasText || hasClass) {
					$.watermark._hide($input);
			
					if (hasText) {
						$input.data(dataText, text);
					}
					
					if (hasClass) {
						$input.data(dataClass, className);
					}
				}
			}
			else {
				$input.data(dataText, hasText? text : "");
				$input.data(dataClass, hasClass? className : $.watermark.className);
				$input.data(dataFlag, 1); // Flag indicates watermark was initialized
				
				// Special processing for password type
				if ($input.attr("type") === "password") {
					var $wrap = $input.wrap("<span>").parent();
					var $wm = $($wrap.html().replace(/type=["']?password["']?/i, 'type="text"'));
					
					$wm.data(dataText, $input.data(dataText));
					$wm.data(dataClass, $input.data(dataClass));
					$wm.data(dataFlag, 1);
					
					$wm.focus(
						function () {
							$.watermark._hide($wm, true);
						}
					);
					$input.blur(
						function () {
							$.watermark._show($input);
						}
					);
					
					$wm.data(dataPassword, $input);
					$input.data(dataPassword, $wm);
				}
				else {
					
					$input.focus(
						function () {
							$input.data(dataFocus, 1);
							$.watermark._hide($input, true);
						}
					).blur(
						function () {
							$input.data(dataFocus, 0);
							$.watermark._show($input);
						}
					);
				}
				
				// In order to reliably clear all watermarks before form submission,
				// we need to replace the form's submit function with our own
				// function.  Otherwise watermarks won't be cleared when the form
				// is submitted programmatically.
				var $form = $(this.form);
				
				if (!$form.data(dataFormSubmit)) {
					$form.data(dataFormSubmit, this.form.submit);
					$form.submit($.watermark.hideAll);
					
					this.form.submit = function () {
						$.watermark.hideAll();
						$form.data(dataFormSubmit).apply($form[0], arguments);
					};
				}
			}
			
			$.watermark._show($input);
		}
	).end();
};

})(jQuery);
