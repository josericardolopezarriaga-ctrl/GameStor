function login() {
    let usuario = document.getElementById("usuario").value;
    let contraseña = document.getElementById("contraseña").value;

    if (usuario === "pavo05" && contraseña === "pelon123") {
        window.location.href = "principal.html";
    } else {
        alert("Usuario o contraseña incorrectos");
    }
}

let isMuted = true;
const audio = document.getElementById('background-music');
const volumeIcon = document.getElementById('volume-icon');

window.addEventListener('load', () => {
    audio.volume = 0.3;
    audio.play().catch(() => {
        document.addEventListener('click', () => {
            if(isMuted){
                audio.play();
                isMuted = false;
                volumeIcon.textContent = '🔊';
            }
        }, { once: true });
    });
});

function toggleMute(){
    if(isMuted){
        audio.muted = false;
        audio.play();
        volumeIcon.textContent = '🔊';
        isMuted = false;
    } else {
        audio.muted = true;
        volumeIcon.textContent = '🔇';
        isMuted = true;
    }
}

if (document.getElementById('phone')) {
    let carrito = [];
    let total = 0;

    const hoy = new Date();
    document.getElementById('fecha-hoy').textContent = `Fecha: ${hoy.toLocaleDateString()} ${hoy.toLocaleTimeString()}`;


    function agregarAlTicket(nombre, precio) {
        if(carrito.length === 0) {
            document.getElementById('lista-compra').innerHTML = '';
        }

        const existe = carrito.find(p => p.nombre === nombre);
        if(existe) {
            existe.cantidad++;
        } else {
            carrito.push({ nombre: nombre, precio: precio, cantidad: 1 });
        }

        actualizarVistaTicket();
    }

    function actualizarVistaTicket() {
        const tbody = document.getElementById('lista-compra');
        tbody.innerHTML = '';
        total = 0;

        carrito.forEach((prod, index) => {
            const subtotal = prod.precio * prod.cantidad;
            total += subtotal;

            const fila = `
                <tr>
                    <td>${prod.nombre}</td>
                    <td>x${prod.cantidad}</td>
                    <td>$${subtotal.toLocaleString()}</td>
                </tr>
            `;
            tbody.innerHTML += fila;
        });

        if(carrito.length === 0) {
            tbody.innerHTML = '<tr class="fila-vacia"><td colspan="3" style="text-align:center; color:#999;">Tu carrito está vacío</td></tr>';
        }

        document.getElementById('total').textContent = `$${total.toLocaleString()} MXN`;
    }

    function finalizarCompra() {
        const telefono = document.getElementById('phone').value.trim();
        const email = document.getElementById('email').value.trim();
        const usarWhatsapp = document.getElementById('usar-whatsapp').checked;

        // Validaciones
        if (carrito.length === 0) {
            alert("⚠️ Tu carrito está vacío. Agrega al menos un producto.");
            return;
        }
        if (telefono === "") {
            alert("⚠️ Por favor, ingresa tu número de teléfono.");
            return;
        }

        document.getElementById('telefono-en-ticket').textContent = `Cliente: ${telefono}`;

        alert(`✅ ¡COMPRA REALIZADA CON ÉXITO!\n\nTotal pagado: $${total.toLocaleString()} MXN\nGracias por comprar en Game Storm.`);

        let listaProductos = "";
        carrito.forEach(p => {
            listaProductos += `- ${p.nombre} (x${p.cantidad})\n`;
        });

        if (usarWhatsapp) {
            const numeroNegocio = "525574708613";
            const mensajeWA = encodeURIComponent(
                `*NUEVA COMPRA GAME STORM* \n\n` +
                `Hola, acabo de realizar una compra:\n` +
                `${listaProductos}\n` +
                `💰 Total: $${total.toLocaleString()} MXN\n` +
                `📱 Mi tel: ${telefono}\n\n¡Quedo pendiente!`
            );
            window.open(`https://wa.me/${numeroNegocio}?text=${mensajeWA}`, '_blank');

        } else if (email !== "") {            const asunto = encodeURIComponent("Confirmación de compra - Game Storm");
            const cuerpo = encodeURIComponent(
                `Hola, tu compra en Game Storm ha sido exitosa.\n\nProductos:\n${listaProductos}\n` +
                `Total pagado: $${total.toLocaleString()} MXN\nTeléfono: ${telefono}\n\n¡Gracias!`
            );
            window.open(`mailto:${email}?subject=${asunto}&body=${cuerpo}`);
        }

        setTimeout(() => { window.print(); }, 1000);
    }
}