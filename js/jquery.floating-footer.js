/**
 * Copyright 2012 Nöll & Kötterheinrich GbR
 *                Garden of Concepts GmbH             
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * jQuery plugin for floating footer
 *
 * @author David Kötterheinrich <David Kötterheinrich> 
 * @author Dennis Oehme <oehme@gardenofconcepts.com>
 */
(function( $ ) {

    $.fn.floatingFooter = function()
    {
        return this.each(function() {
            var elem = $(this);
            var bottomHeight = elem.height();
            var bottomOffset = (parseInt(elem.css('marginTop').replace('px', ''))) *-1; 
            var diff = $(document).height() - (elem.height());
                
            if (getDocHeight() > $(window).height()) {
                elem.removeClass('float').addClass('fixed');
                var bottom = bottomHeight + bottomOffset;   
                $('body').css('paddingBottom', bottom + 'px').addClass('bottom-fixed');
            }

            $(window).bind('resize scroll', function() {
                var scrollTop = scrollTop();
                var height = $(this).height();
                
                if ((scrollTop + height) >= (diff + bottomOffset)) {
                    elem.removeClass('fixed').addClass('float');    
                    $('body').css('paddingBottom', '0px').removeClass('bottom-fixed');
                
                } else if ((scrollTop + height) < (diff + bottomOffset)) {
                    elem.removeClass('float').addClass('fixed');
                    var bottom = bottomHeight + bottomOffset;   
                    $('body').css('paddingBottom', bottom + 'px').addClass('bottom-fixed');
                };
            }).scroll();
        });
    }

    function getDocHeight()
    {
        return Math.max(
            $('body').height(),
            $(window).height(),
            document.documentElement.clientHeight /* for opera */
        );
    }

    function scrollTop()
    {
        return filterResults (
            window.pageYOffset ? window.pageYOffset : 0,
            document.documentElement ? document.documentElement.scrollTop : 0,
            document.body ? document.body.scrollTop : 0
        );
    }
    
    function filterResults(win, docel, body)
    {
        var result = win ? win : 0;

        if (docel && (!result || (result > docel))) {
            result = docel;
        }

        return (body && (!result || (result > body))) ? body : result;
    }

})( jQuery );
