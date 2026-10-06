<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('findings', function (Blueprint $table) {
            $table->id();
            $table->string('finding_number')->nullable();
            $table->string('person_name')->nullable();
            $table->string('existing_work_area')->nullable();
            $table->string('clause')->nullable();
            $table->text('finding_statement')->nullable();
            $table->string('location_auditee')->nullable();
            $table->text('cause')->nullable();
            $table->text('objective_evidence')->nullable();
            $table->text('requirement')->nullable();
            $table->text('preventive_action')->nullable();
            $table->string('finding_type')->nullable();
            $table->text('evaluation_note')->nullable();
            $table->boolean('is_published')->default(false);
            $table->foreignId('created_by')->nullable()->constrained('users')->nullOnDelete();
            $table->foreignId('updated_by')->nullable()->constrained('users')->nullOnDelete();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('findings');
    }
};
