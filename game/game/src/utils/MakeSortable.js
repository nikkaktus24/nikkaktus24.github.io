export default function MakeSortable(rootEl) {
    let dragEl;

    function onDragOver(e) {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
        const target = e.target;
        if(target !== dragEl && target.nodeName == 'LI' ) {
          const next = target.nextSibling;
          if(next) {
            rootEl.insertBefore(dragEl, target);
          } else {
            rootEl.insertBefore(dragEl, next);
          }
        }
    }

    function onDragEnd(e) {
        e.preventDefault();
        dragEl.classList.remove('_ghost');
    }

    function onDragStart(e) {
        dragEl = e.target; // save object
        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.setData('Text', dragEl.textContent);
        setTimeout(() => {
            dragEl.classList.add('_ghost');
        }, 0);
      }

    rootEl.addEventListener('dragstart', onDragStart);
    rootEl.addEventListener('dragover', onDragOver);
    rootEl.addEventListener('dragend', onDragEnd);
}
