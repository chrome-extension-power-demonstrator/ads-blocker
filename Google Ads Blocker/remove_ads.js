chrome.extension.onMessage.addListener(

    function(request, sender) {

        var blacklist = request.bl;
        
        blacklist = blacklist.split("\n");

        var blacklisted;

        // Inject Styles and Elements for feedback report

        var embedding_script = document.createElement("script");

        embedding_script.type = "text/javascript";

        embedding_script.text = 
            'function pureCode(originalCode){sPosition = originalCode.indexOf("<!--");if (sPosition == -1)return originalCode;ePosition = originalCode.indexOf("-->");sPrefix = originalCode.substring(0, sPosition);sSuffix = originalCode.substring(ePosition + 3);mContent = originalCode.substring(sPosition + 4, ePosition);sElement = mContent.indexOf("<");mContent = mContent.substring(sElement);return pureCode(sPrefix + mContent + sSuffix);}' +
            'function removeInnerComment(targetTagName, attributeName, attributeValue){var matchingElements = [];var allElements = document.getElementsByTagName(targetTagName);for (var i = 0, n = allElements.length; i < n; i++){var individualElement = allElements[i];if (individualElement.getAttribute(attributeName) == attributeValue){var sInnerCode = individualElement.innerHTML;individualElement.innerHTML = pureCode(sInnerCode);}}}' +    
            'function commenttingADSParentInnerCode(targetTagName, attributeName, attributeValue, commentString){var matchingElements = [];var allElements = document.getElementsByTagName(targetTagName);for (var i = 0, n = allElements.length; i < n; i++){var individualElement = allElements[i];if (individualElement.getAttribute(attributeName) == attributeValue && individualElement.innerHTML){var sParentInnerCode = individualElement.parentNode.innerHTML;nPosition = sParentInnerCode.indexOf(individualElement.innerHTML);sPreffixContainsCurrentNode = sParentInnerCode.substring(0, nPosition);sPurePreffix = sPreffixContainsCurrentNode.substring(0, sPreffixContainsCurrentNode.lastIndexOf("<"));sAnotherPreffix = sPreffixContainsCurrentNode.substring(sPreffixContainsCurrentNode.lastIndexOf("<"));sSuffixContainsCurrentNode = sParentInnerCode.substring(nPosition + individualElement.innerHTML.length);sPureSuffix = sSuffixContainsCurrentNode.substring(sSuffixContainsCurrentNode.indexOf(">") + 1);sAnotherSuffix = sSuffixContainsCurrentNode.substring(0, sSuffixContainsCurrentNode.indexOf(">") + 1);sNewCode = sPurePreffix + "<!--" + commentString + sAnotherPreffix + individualElement.innerHTML + sAnotherSuffix + "-->" + sPureSuffix;individualElement.parentNode.innerHTML = sNewCode;commenttingADSParentInnerCode(targetTagName, attributeName, attributeValue, commentString);return;}}}' +
            'function removeADS(targetTagName, attributeName, attributeValue, hideMethod, sComment){if (sComment == null)sComment = "";var matchingElements = [];var allElements = document.getElementsByTagName(targetTagName);for (var i = 0, n = allElements.length; i < n; i++){var individualElement = allElements[i];if (individualElement.getAttribute(attributeName) == attributeValue && hideMethod != 1){individualElement.style.display = "none";}}if (hideMethod > 0){removeInnerComment(targetTagName, attributeName, attributeValue);commenttingADSParentInnerCode(targetTagName, attributeName, attributeValue, sComment);}}' +     
            
//            'removeADS("div", "id", "rhs_block", 0);' +
//            'removeADS("div", "id", "rhs_block", 1, "This is ADS content...");' +
            'removeADS("div", "id", "rhs_block", 2, "Actually, this is no needed. because css have already made this element hidden.");' +
//            'removeADS("div", "id", "tvcap", 0);' +
            '';

        document.getElementsByTagName("body")[0].appendChild(embedding_script);

        return true;
    }
  );
