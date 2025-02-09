// Tüm dersleri içeren ana obje
const gdScriptLessons = {
    // 1. Ders: Temel giriş ve kurulum bilgileri
    "1. Giriş ve Kurulum": `# GDScript'e Giriş ve Kurulum

# 1. Godot Engine Nedir?
# Açık kaynak oyun motoru hakkında temel bilgiler
- Açık kaynak kodlu oyun motoru
- 2D ve 3D oyun geliştirme desteği
- Kendi programlama dili: GDScript
- Hafif ve hızlı geliştirme ortamı

# 2. GDScript'in Temelleri
# GDScript'in temel özellikleri ve avantajları
- Python benzeri sözdizimi
- Tip güvenli ve dinamik
- Godot'a özel optimize edilmiş
- Kolay öğrenme eğrisi

# 3. Godot'u İndirme ve Kurulum
# Farklı işletim sistemleri için kurulum adımları
# Windows için kurulum adımları:
1. godotengine.org adresine git
2. Son sürümü indir (Standard veya Mono)
3. ZIP dosyasını çıkart
4. Godot.exe'yi çalıştır

# Linux sistemler için kurulum:
sudo apt install godot # Ubuntu/Debian için
# veya alternatif yöntem
flatpak install flathub org.godotengine.Godot

# 4. İlk Projenin Oluşturulması
# Yeni bir Godot projesi başlatma adımları
1. Godot Project Manager'ı aç
2. "New Project" butonuna tıkla
3. Proje adı ve konum belirle
4. Boş 2D sahne oluştur

# 5. Godot Arayüzüne Genel Bakış
# Editör arayüzünün temel bileşenleri
- FileSystem: Proje dosyaları
- Scene: Sahne hiyerarşisi
- Inspector: Node özellikleri
- Script Editor: Kod düzenleme
- Output: Konsol çıktısı`,

    // 2. Ders: GDScript'in temel programlama kavramları
    "2. GDScript Temelleri": `# GDScript'in Temel Yapısı

# 1. GDScript Nedir ve Neden Kullanılır?
# GDScript'in Godot ile entegrasyonu ve avantajları
- Godot için özel tasarlanmış dil
- Yüksek performans ve kolay entegrasyon
- Node sistemiyle tam uyum
- Zengin oyun geliştirme API'leri

# 2. Değişkenler ve Veri Tipleri
# Temel veri tiplerinin tanımlanması ve kullanımı
var sayi: int = 42              # Tam sayı değişkeni
var metin: String = "Merhaba"   # Metin değişkeni
var koordinat: Vector2 = Vector2(100, 100)  # 2D koordinat
var aktif: bool = true          # Mantıksal değişken
var hiz: float = 3.14           # Ondalıklı sayı

# Diziler ve Sözlükler örnekleri
# Koleksiyon veri tiplerinin kullanımı
var items = ["kılıç", "kalkan", "iksir"]  # Basit dizi örneği
var player = {
    "can": 100,        # Oyuncu canı
    "level": 1,        # Oyuncu seviyesi
    "isim": "Kahraman" # Oyuncu adı
}

# 3. Operatörler ve Koşullu İfadeler
# Temel kontrol yapıları
if can <= 0:
    game_over()           # Oyun bitti durumu
elif can < 20:
    tehlike_sesi_cal()    # Düşük can uyarısı
else:
    oyuna_devam()         # Normal durum

# 4. Döngüler
# For ve While döngü örnekleri
# For Döngüsü örneği
for item in items:
    print(item)

# While Döngüsü örneği
var i = 0
while i < 5:
    print(i)
    i += 1

# 5. Fonksiyonlar
# Fonksiyon tanımlama ve kullanım örnekleri
# Hasar verme fonksiyonu
func hasar_ver(miktar: int) -> void:
    can -= miktar
    if can <= 0:
        olum()

# Can arttırma fonksiyonu
func can_artir(miktar: int = 10) -> bool:
    if can < max_can:
        can = min(can + miktar, max_can)
        return true
    return false`,

    "3. Nesne Tabanlı Programlama": `# Godot'ta OOP

# 1. Sınıflar ve Nesneler
class_name Karakter
extends Node2D

var can: int = 100
var hiz: float = 10.0

func hareket_et(yon: Vector2):
    position += yon * hiz

# 2. Miras ve Polimorfizm
class_name Dusman
extends Karakter

func _init():
    can = 50
    hiz = 5.0

func hasar_ver():
    # Düşman özel saldırı mantığı
    pass

# 3. Sinyaller
signal hasar_alindi(miktar: int)
signal karakter_oldu

func hasar_al(miktar: int):
    can -= miktar
    emit_signal("hasar_alindi", miktar)
    if can <= 0:
        emit_signal("karakter_oldu")

# 4. Sahne ve Düğüm Mantığı
# Node hiyerarşisi örneği:
# World (Node2D)
#   |- Player (CharacterBody2D)
#   |- Enemies (Node2D)
#   |   |- Enemy1 (CharacterBody2D)
#   |   |- Enemy2 (CharacterBody2D)
#   |- UI (CanvasLayer)

# 5. Script ve Node İlişkisi
func _ready():
    # Node hazır olduğunda çağrılır
    baslangic_ayarlari()

func _process(delta):
    # Her karede çağrılır
    hareket_guncelle(delta)

func _input(event):
    # Girdi olduğunda çağrılır
    if event.is_action_pressed("jump"):
        zipla()`,

    "4. Hareket ve Fizik": `# Hareket ve Fizik Sistemleri

# 1. KinematicBody2D Kullanımı
extends CharacterBody2D

var HAREKET_HIZI = 300
var YER_CEKIMI = 980
var ZIPLAMA_GUCU = -400

func _physics_process(delta):
    # Yerçekimi uygula
    velocity.y += YER_CEKIMI * delta
    
    # Yatay hareket
    var yon = Input.get_axis("ui_left", "ui_right")
    velocity.x = yon * HAREKET_HIZI
    
    # Hareketi uygula
    move_and_slide()

# 2. RigidBody2D Örneği
extends RigidBody2D

func _ready():
    # Fizik özelliklerini ayarla
    mass = 1.0
    gravity_scale = 1.0
    contact_monitor = true
    contacts_reported = 4

# 3. Çarpışma Algılama
func _on_body_entered(body):
    if body.is_in_group("dusmanlar"):
        hasar_al(10)
    elif body.is_in_group("toplanabilir"):
        topla(body)

# 4. Raycast Kullanımı
var raycast: RayCast2D

func duvar_kontrol():
    if raycast.is_colliding():
        var nesne = raycast.get_collider()
        print("Çarpışılan nesne: ", nesne.name)`,

    "5. Kullanıcı Arayüzü": `# UI ve Etkileşim

# 1. UI Bileşenleri
# Control node'ları
extends Control

@onready var can_bar = $CanvasLayer/HealthBar
@onready var skor_label = $CanvasLayer/ScoreLabel
@onready var menu_panel = $CanvasLayer/MenuPanel

# 2. UI Etkileşimleri
func _on_start_button_pressed():
    oyunu_baslat()

func _on_quit_button_pressed():
    get_tree().quit()

# 3. Giriş Algılama
func _input(event):
    if event is InputEventKey:
        if event.pressed and event.keycode == KEY_ESCAPE:
            menu_goster()
    
    if event is InputEventMouseButton:
        if event.button_index == MOUSE_BUTTON_LEFT:
            ates_et()

# 4. HUD Güncelleme
func can_guncelle(yeni_can: int):
    can_bar.value = yeni_can
    
func skor_guncelle(yeni_skor: int):
    skor_label.text = "Skor: " + str(yeni_skor)`,

    "6. Verilerle Çalışmak": `# Veri İşleme ve Kaydetme

# 1. Dosya Okuma ve Yazma
# Dosya Okuma
func dosya_oku():
    var dosya = FileAccess.open('res://veri.txt', FileAccess.READ)
    if dosya:
        while !dosya.eof_reached():
            var satir = dosya.get_line()
            print('Okunan: ' + satir)

# Dosya Yazma
func dosya_yaz(icerik: String):
    var dosya = FileAccess.open('user://kayit.txt', FileAccess.WRITE)
    if dosya:
        dosya.store_string(icerik)
        print('Dosya yazıldı!')

# 2. Global Değişkenler
# Global.gd dosyası
extends Node

var oyuncu_skoru: int = 0
var en_yuksek_skor: int = 0
var oyun_zorluğu: String = "normal"

func skor_kaydet():
    var kayit = FileAccess.open("user://skor.save", FileAccess.WRITE)
    kayit.store_line(str(en_yuksek_skor))

# 3. JSON Veri İşleme
# Kaydetme
var oyuncu_verisi = {
    "isim": "Kahraman",
    "seviye": 5,
    "envanter": ["kılıç", "kalkan"],
    "konum": {"x": 100, "y": 200}
}
var json_string = JSON.stringify(oyuncu_verisi)

# Okuma
var kayitli_veri = JSON.parse_string(json_string)
print(kayitli_veri.isim) # "Kahraman" yazdırır`,

    "7. Oyun Mekanikleri ve AI": `# Yapay Zeka ve Oyun Mekanikleri

# 1. Basit Düşman AI
extends CharacterBody2D

var hedef: Node2D
var takip_mesafesi: float = 200.0
var saldiri_mesafesi: float = 50.0

func _physics_process(delta):
    if hedef:
        var mesafe = global_position.distance_to(hedef.global_position)
        if mesafe < takip_mesafesi:
            var yon = (hedef.global_position - global_position).normalized()
            velocity = yon * HAREKET_HIZI
            move_and_slide()
            if mesafe < saldiri_mesafesi:
                saldir()

# 2. Yol Bulma (Pathfinding)
@onready var nav_agent = $NavigationAgent2D

func hedefe_git(hedef_konum: Vector2):
    nav_agent.set_target_position(hedef_konum)
    
func _physics_process(delta):
    if nav_agent.is_navigation_finished():
        return
        
    var yon = global_position.direction_to(nav_agent.get_next_path_position())
    velocity = yon * HAREKET_HIZI
    move_and_slide()

# 3. Envanter Sistemi
class_name Envanter
extends Node

var esyalar = []
var max_slot = 10

func esya_ekle(esya: Item) -> bool:
    if esyalar.size() < max_slot:
        esyalar.append(esya)
        return true
    return false

func esya_kullan(index: int):
    if index < esyalar.size():
        var esya = esyalar[index]
        esya.kullan()
        if esya.tukenebilir:
            esyalar.remove_at(index)`,

    "8. Ses ve Efektler": `# Ses ve Görsel Efektler

# 1. Ses Efektleri
extends Node

@onready var ses_oynatici = $AudioStreamPlayer
@onready var muzik_oynatici = $AudioStreamPlayer

# Ses efekti çalma
func ses_cal(ses_efekti: AudioStream):
    ses_oynatici.stream = ses_efekti
    ses_oynatici.play()

# Müzik çalma ve geçiş
func muzik_cal(muzik: AudioStream, gecis_suresi: float = 1.0):
    var tween = create_tween()
    tween.tween_property(muzik_oynatici, "volume_db", -80, gecis_suresi)
    await tween.finished
    muzik_oynatici.stream = muzik
    muzik_oynatici.play()
    tween = create_tween()
    tween.tween_property(muzik_oynatici, "volume_db", 0, gecis_suresi)

# 2. Animasyonlar
@onready var animasyon = $AnimationPlayer

func animasyon_oynat(anim_adi: String):
    if animasyon.has_animation(anim_adi):
        animasyon.play(anim_adi)

# 3. Partikül Efektleri
@onready var parcacik_efekti = $GPUParticles2D

func efekt_baslat():
    parcacik_efekti.emitting = true

func efekt_durdur():
    parcacik_efekti.emitting = false`,

    "9. Optimizasyon": `# Performans Optimizasyonu

# 1. Kod Optimizasyonu
# Kötü Örnek
func _process(delta):
    for dusman in get_tree().get_nodes_in_group("dusmanlar"):
        dusman.hedef_guncelle(oyuncu.position)
        dusman.hareket_et()

# İyi Örnek
func _process(delta):
    if Engine.get_physics_frames() % 10 == 0:  # Her 10 karede bir güncelle
        var dusmanlar = get_tree().get_nodes_in_group("dusmanlar")
        for dusman in dusmanlar:
            dusman.hedef_guncelle(oyuncu.position)

# 2. Bellek Yönetimi
# Kaynakları Önceden Yükleme
func _ready():
    var texture_yolu = "res://textures/karakter.png"
    var texture = load(texture_yolu)
    ResourceLoader.load_threaded_request(texture_yolu)

# Kaynakları Temizleme
func _exit_tree():
    for child in get_children():
        child.queue_free()

# 3. Görsel Optimizasyon
func gorunurluk_kontrolu():
    if not is_on_screen():
        set_physics_process(false)
        hide()
    else:
        set_physics_process(true)
        show()`,

    "10. Proje ve Yayınlama": `# Proje Yönetimi ve Yayınlama

# 1. Proje Yapısı
# project.godot
config_version=5

[application]
config/name="Oyun Adı"
run/main_scene="res://scenes/main.tscn"
config/features=PackedStringArray("4.0")

# 2. Hata Ayıklama
func _ready():
    print_debug("Oyun başlatıldı")
    
func hasar_al(miktar: int):
    push_warning("Hasar alındı: " + str(miktar))
    if miktar < 0:
        push_error("Geçersiz hasar miktarı!")

# 3. Export Ayarları
# export_presets.cfg
[preset.0]
name="Windows Desktop"
platform="Windows Desktop"
runnable=true
custom_features=""
export_filter="all_resources"
include_filter=""
exclude_filter=""

# 4. Sürüm Kontrolü
const SURUM = "1.0.0"
const YAMA_NOTLARI = """
- Yeni karakter eklendi
- Hata düzeltmeleri yapıldı
- Performans iyileştirmeleri
"""

func surum_kontrol():
    var guncel_surum = await sunucudan_surum_al()
    if guncel_surum != SURUM:
        guncelleme_bildir()`
};

// DOM elementlerini seç
const lessonSelect = document.getElementById('lessonSelect');
const codeDisplay = document.getElementById('codeDisplay');
const prevButton = document.getElementById('prevButton');
const nextButton = document.getElementById('nextButton');

// Dersleri select elementine ekle
Object.keys(gdScriptLessons).forEach(lesson => {
    const option = document.createElement('option');
    option.text = lesson;
    option.value = lesson;
    lessonSelect.add(option);
});

// İlk dersi göster
if (lessonSelect.options.length > 0) {
    lessonSelect.selectedIndex = 0;
    codeDisplay.textContent = gdScriptLessons[lessonSelect.value];
}

// Event listeners
lessonSelect.addEventListener('change', () => {
    codeDisplay.textContent = gdScriptLessons[lessonSelect.value];
    updateNavigationButtons();
});

prevButton.addEventListener('click', () => {
    if (lessonSelect.selectedIndex > 0) {
        lessonSelect.selectedIndex--;
        codeDisplay.textContent = gdScriptLessons[lessonSelect.value];
        updateNavigationButtons();
    }
});

nextButton.addEventListener('click', () => {
    if (lessonSelect.selectedIndex < lessonSelect.options.length - 1) {
        lessonSelect.selectedIndex++;
        codeDisplay.textContent = gdScriptLessons[lessonSelect.value];
        updateNavigationButtons();
    }
});

// Navigasyon butonlarının durumunu güncelle
function updateNavigationButtons() {
    prevButton.disabled = lessonSelect.selectedIndex === 0;
    nextButton.disabled = lessonSelect.selectedIndex === lessonSelect.options.length - 1;
}

// Başlangıçta butonların durumunu ayarla
updateNavigationButtons(); 