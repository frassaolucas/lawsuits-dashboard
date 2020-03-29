var cardList = document.querySelector('.card-list');
var allProcess = document.querySelector('.all-process__number');
var numberOfProcess = Object.keys(myData.cards).length;
var tagList = document.querySelector('.tag-filter__item-wrapper');

// ADD ALL PROCESS VALUE TO TAB
allProcess.innerHTML = numberOfProcess;

// GET PROCESS INFORMATION
for (const oCard of myData.cards) {

    // CREATE CARD DIV
    var card = document.createElement('div');

    // ADD CARD CLASS TO DIV
    card.classList.add('card');

    // CREATE CARD STRUCTURE
    card.innerHTML = `
        <div class="card__general-information">
            <div class="process-status">
                <div class="process-status__positive">
                    <span class="icon-Positive"></span>
                    <span class="positive-name">
                        ${oCard.partes.ativa.name} 
                    </span>
                    <span class="positive-number">
                        ${(oCard.partes.ativa.plus ? oCard.partes.ativa.plus : '')} 
                    </span>
                </div>
                <div class="process-status__negative">
                    <span class="icon-Negative"></span>
                    <span>
                        ${oCard.partes.passiva.name}
                    </span>
                </div>
            </div>
            <div class="process-type">
                <span class="process-type__category">
                    ${oCard.classe} - 
                </span>
                <span class="process-type__description">
                    ${oCard.assunto}
                </span>
            </div>
            <div class="process-lower-info">
                <div class="process-lower-info__process-number">
                    ${oCard.numero}
                </div>
                <div class="process-lower-info__process-label-wrapper">
                    <div class="process-lower-info__process-label" style="background-color: #F4F4F4; color: #0078D7">
                        Tarja - exemplo
                    </div>
                </div>
            </div>
        </div>
        <div class="card__open-folder">
            <span class="icon-Folder"></span>
            <span>Abrir Pasta</span>
        </div>
        <div class="card__tags">
            <div class="card__icon-wrapper">
                <span class="icon-Tag"></span>
            </div>
            <div class="card__tag-wrapper">
                ${createTags(oCard)}
            </div>
        </div>`;

    // ADD CARD TO CARD-LIST
    cardList.appendChild(card);

    // CREATE TAG STRUCTURE
    function createTags(oCardTag) {
        var textTag = '';

        for(const oCardTag of oCard.tag) {
            var tagObj = getTagObj(oCardTag + '');

            textTag += `
                <div class="card__tag" style="background-color: ${tagObj.background}; color: ${tagObj.color}">
                    ${tagObj.name}
                </div>`
        }

        return textTag;
    }

    // GET TAG OBJECT
    function getTagObj(id) {
        var tagObj;

        for(const oTagObj of myData.tags) {

            if(oTagObj.id == id) {
                tagObj = oTagObj;
            }
        }
        return tagObj;
    }
}

// GET TAG INFORMATION
for (const oTag of myData.tags) {

    var tagId = parseInt(oTag.id);
    var numberOfTags = 0;

    // GET TAGS FOR EACH CARD
    for (const oCardForTag of myData.cards) {
        var cardTagId = oCardForTag.tag;

        // CHECK IF THE CARD TAG HAS THE TAG ID
        if (Object.values(cardTagId).indexOf(tagId) > -1) {
            // ADD +1 TO THE NUMBER OF THE PARTICULAR TAG
            numberOfTags += 1;
        }
    }

    // CREATE TAG ITEM DIV
    var tag = document.createElement('div');

    tag.setAttribute('id', 'tag' + tagId);
    tag.classList.add('tag-filter__item');
    tag.classList.add('tag-filter__item--not-selected');

    // CREATE TAG STRUCTURE
    tag.innerHTML = `
        <div class="tag-filter__rectangle" style="background-color: ${oTag.background}"></div>
        
        <span class="tag-filter__name">
            ${oTag.name}
        </span>
        
        <span class="tag-filter__value">${numberOfTags}</span>
    `;

    // ADD CARD TO CARD-LIST
    tagList.appendChild(tag);
}