export const formatRupiah = (value, withPrefix = true) => {
    // Konversi string ke float
    const angka = parseFloat(value);

    if (isNaN(angka)) return '-';

    const formatted = angka.toLocaleString('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0, // hilangkan koma
        maximumFractionDigits: 0,
    });

    return withPrefix ? formatted : formatted.replace(/^Rp\s?/, '');
};
