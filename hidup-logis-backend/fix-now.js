// fix-now.js
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./dev.db');

console.log('🔧 Fixing audit data...');

// 1. Cari user ID kamu
db.get("SELECT id, email FROM User WHERE email = ?", ['fathiirtatri.3@gmail.com'], (err, user) => {
    if (err) {
        console.error('❌ Error:', err.message);
        db.close();
        return;
    }
    
    if (!user) {
        console.error('❌ User not found');
        db.close();
        return;
    }
    
    console.log('✅ Found user:', user.email);
    console.log('📋 User ID:', user.id);
    
    // 2. Hitung audit sebelum
    db.get("SELECT COUNT(*) as count FROM Audit WHERE userId = ?", [user.id], (err, before) => {
        console.log('📊 Audits belonging to user BEFORE:', before.count);
        
        // 3. Update SEMUA audit ke userId ini
        db.run("UPDATE Audit SET userId = ?", [user.id], function(err) {
            if (err) {
                console.error('❌ Update error:', err.message);
                db.close();
                return;
            }
            
            console.log('✅ Updated', this.changes, 'audit records');
            
            // 4. Hitung audit setelah
            db.get("SELECT COUNT(*) as count FROM Audit WHERE userId = ?", [user.id], (err, after) => {
                console.log('📊 Audits belonging to user AFTER:', after.count);
                
                // 5. Update user auditCount
                db.run("UPDATE User SET auditCount = ? WHERE id = ?", [after.count, user.id], function(err) {
                    if (err) {
                        console.error('❌ Error updating user:', err.message);
                    } else {
                        console.log('📈 Updated user auditCount to', after.count);
                    }
                    
                    // 6. Tampilkan sample
                    db.all("SELECT id, salary, totalScore, zone FROM Audit WHERE userId = ? LIMIT 3", [user.id], (err, audits) => {
                        console.log('📝 Sample audits:');
                        if (audits && audits.length > 0) {
                            audits.forEach((audit, i) => {
                                console.log(`  ${i+1}. Salary: Rp ${audit.salary.toLocaleString('id-ID')} | Score: ${audit.totalScore} | Zone: ${audit.zone}`);
                            });
                        } else {
                            console.log('  No audits found');
                        }
                        
                        console.log('🎉 Fix completed!');
                        db.close();
                        process.exit(0);
                    });
                });
            });
        });
    });
});