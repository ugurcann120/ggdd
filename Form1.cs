using System;
using System.Drawing;
using System.Collections.Generic;
using System.Windows.Forms;

namespace WinFormsApp2
{
    public partial class Form1 : Form
    {
        private ListBox lessonList;
        private RichTextBox codeDisplay;
        private Button nextButton;
        private Button previousButton;
        private Label lessonTitle;

        private Dictionary<string, string> gdScriptLessons = new Dictionary<string, string>();

        public Form1()
        {
            InitializeComponent();
            SetupUI();
            LoadLessons();
        }

        private void SetupUI()
        {
            this.Text = "GDScript Öğrenme Uygulaması";
            this.Size = new Size(800, 600);

            lessonTitle = new Label
            {
                Location = new Point(10, 10),
                Size = new Size(200, 30),
                Text = "GDScript Dersleri"
            };

            lessonList = new ListBox
            {
                Location = new Point(10, 50),
                Size = new Size(200, 400)
            };

            codeDisplay = new RichTextBox
            {
                Location = new Point(220, 50),
                Size = new Size(550, 400),
                ReadOnly = true
            };

            previousButton = new Button
            {
                Location = new Point(220, 460),
                Size = new Size(100, 30),
                Text = "Önceki"
            };

            nextButton = new Button
            {
                Location = new Point(330, 460),
                Size = new Size(100, 30),
                Text = "Sonraki"
            };

            this.Controls.AddRange(new Control[] { lessonTitle, lessonList, codeDisplay, previousButton, nextButton });
            
            lessonList.SelectedIndexChanged += LessonList_SelectedIndexChanged;
            nextButton.Click += NextButton_Click;
            previousButton.Click += PreviousButton_Click;
        }

        private void LoadLessons()
        {
            gdScriptLessons.Add("1. Temel Değişkenler ve Veri Tipleri", @"# GDScript'te Değişkenler ve Veri Tipleri

# 1. Temel Değişken Tanımlamaları
var sayi = 42          # Otomatik tip belirleme
var metin: String = 'Merhaba Dünya'  # String (metin) değişken 
var tam_sayi: int = 100              # Integer (tam sayı)
var ondalik: float = 3.14            # Float (ondalıklı sayı)
var durum: bool = true               # Boolean (mantıksal değer)

# 2. Diziler (Arrays)
var meyveler = ['elma', 'armut', 'muz']  # Basit dizi
var sayilar: Array[int] = [1, 2, 3, 4, 5]  # Tipli dizi

# 3. Sözlükler (Dictionaries)
var oyuncu = {
    'can': 100,
    'isim': 'Kahraman',
    'silahlar': ['kılıç', 'yay']
}

# 4. Sabitler (Constants)
const YERCEKIM = 9.8
const MAX_CAN = 100
const OYUN_SURUMU = '1.0.0'

# 5. Export Değişkenler (Unity'deki Inspector gibi)
@export var hiz = 200  # Inspector'da görünür ve düzenlenebilir
@export_range(0, 100) var guc = 50  # 0-100 arası değer alır
@export var zirh_tipi: String = 'hafif'  # Metin olarak zırh tipi");

            gdScriptLessons.Add("2. Fonksiyonlar ve Metodlar", @"# GDScript'te Fonksiyonlar ve Metodlar

# 1. Temel Fonksiyon Tanımı
func selamla():
    print('Merhaba Dünya!')

# 2. Parametreli Fonksiyon
func hasar_ver(hedef: Node, miktar: int):
    hedef.can -= miktar
    print(hedef.isim + ' ' + str(miktar) + ' hasar aldı!')

# 3. Dönüş Değeri Olan Fonksiyon
func can_hesapla(temel_can: int, seviye: int) -> int:
    return temel_can + (seviye * 10)

# 4. Varsayılan Parametreli Fonksiyon
func iyilestir(miktar: int = 10):
    can = min(can + miktar, MAX_CAN)
    print(str(miktar) + ' can iyileştirildi')

# 5. Godot'un Özel Fonksiyonları
func _ready(): # Node oluşturulduğunda çağrılır
    print('Karakter hazır!')
    baslangic_ayarlari()

func _process(delta: float): # Her karede çağrılır
    hareket_guncelle(delta)
    animasyon_kontrol()

func _input(event): # Kullanıcı girdilerini yakalar
    if event.is_action_pressed('atak'):
        saldir()
    elif event.is_action_pressed('zipla'):
        zipla()");

            gdScriptLessons.Add("3. Sınıflar ve Kalıtım", @"# GDScript'te Sınıflar ve Kalıtım

# 1. Temel Sınıf Tanımı
class_name Karakter
extends Node2D  # Node2D sınıfından kalıtım alır

# 2. Özellikler (Properties)
var can: int = 100
var hiz: float = 10.0
var isim: String = 'Kahraman'
@export var guc: int = 25
@export var zirh: int = 10

# 3. Kurucu Fonksiyon
func _init():
    print(isim + ' oluşturuldu!')
    envanter = []
    yetenekler = {}

# 4. Metodlar
func hareket_et(yon: Vector2) -> void:
    position += yon * hiz
    animasyon_oynat('yuru')
    
func hasar_al(miktar: int) -> void:
    var gercek_hasar = max(miktar - zirh, 1)
    can -= gercek_hasar
    hasar_efekti_goster()
    
    if can <= 0:
        oldur()

func iyilestir(miktar: int) -> void:
    can = min(can + miktar, 100)
    iyilesme_efekti_goster()

# 5. Sinyaller (Events)
signal hasar_alindi(miktar: int)
signal karakter_oldu
signal seviye_atladi(yeni_seviye: int)");

            gdScriptLessons.Add("4. Kontrol Yapıları", @"# GDScript'te Kontrol Yapıları

# 1. If-Elif-Else Yapısı
var puan = 75
if puan >= 90:
    print('AA - Çok İyi!')
elif puan >= 80:
    print('BA - İyi!')
elif puan >= 70:
    print('BB - Orta!')
else:
    print('FF - Başarısız!')

# 2. Match (Switch-Case benzeri)
var silah = 'kilic'
match silah:
    'kilic':
        hasar = 10
        menzil = 2
    'ok':
        hasar = 7
        menzil = 15
    'asa':
        hasar = 15
        menzil = 10
    _:  # Varsayılan durum
        hasar = 1
        menzil = 1

# 3. Döngüler
# For Döngüsü
for i in range(5):
    print('Döngü: ' + str(i))

# While Döngüsü
var sayac = 0
while sayac < 5:
    print('Sayaç: ' + str(sayac))
    sayac += 1

# Dizi Üzerinde Döngü
var esyalar = ['kilic', 'kalkan', 'iksir']
for esya in esyalar:
    print('Envanterde: ' + esya)

# 4. Break ve Continue
for i in range(10):
    if i == 5:
        break  # Döngüyü sonlandırır
    if i % 2 == 0:
        continue  # Sonraki elemana geçer
    print(i)");

            gdScriptLessons.Add("5. Dosya İşlemleri", @"# GDScript'te Dosya İşlemleri

# 1. Dosya Okuma
func dosya_oku():
    var dosya = FileAccess.open('res://veri.txt', FileAccess.READ)
    if dosya:
        while !dosya.eof_reached():
            var satir = dosya.get_line()
            print('Okunan: ' + satir)

# 2. Dosya Yazma
func dosya_yaz(icerik: String):
    var dosya = FileAccess.open('user://kayit.txt', FileAccess.WRITE)
    if dosya:
        dosya.store_string(icerik)
        print('Dosya yazıldı!')

# 3. JSON İşlemleri
# JSON Kaydetme
var veri = {
    'oyuncu': {
        'isim': 'Kahraman',
        'seviye': 5,
        'can': 100
    },
    'envanter': ['kilic', 'kalkan', 'iksir']
}
var json_metin = JSON.stringify(veri)

# JSON Okuma
var json_string = '{\""skor\"":100,\""isim\"":\""Oyuncu\""}'
var json_veri = JSON.parse_string(json_string)
print(json_veri.skor) # 100 yazdırır");

            foreach (var lesson in gdScriptLessons.Keys)
            {
                lessonList.Items.Add(lesson);
            }
        }

        private void LessonList_SelectedIndexChanged(object sender, EventArgs e)
        {
            if (lessonList.SelectedItem != null)
            {
                string selectedLesson = lessonList.SelectedItem.ToString();
                codeDisplay.Text = gdScriptLessons[selectedLesson];
            }
        }

        private void NextButton_Click(object sender, EventArgs e)
        {
            if (lessonList.SelectedIndex < lessonList.Items.Count - 1)
            {
                lessonList.SelectedIndex++;
            }
        }

        private void PreviousButton_Click(object sender, EventArgs e)
        {
            if (lessonList.SelectedIndex > 0)
            {
                lessonList.SelectedIndex--;
            }
        }
    }
} 